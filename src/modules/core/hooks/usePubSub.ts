import { createContext, useReducer, useEffect, useRef, Context } from 'react';

type TChannelName = string | number;

interface InitialState {
  channels: Record<TChannelName, Function[]>;
}

type TActions =
  | {
      type: 'Subscribe' | 'Unsubscribe';
      channel: TChannelName;
      handler: Function;
    }
  | {
      type: 'Publish';
      message?: Record<string, any>;
      channel: TChannelName;
    };

type TPublishFunction = <T>(
  channel: TChannelName,
  message?: T extends undefined ? Record<string, any> : T,
) => void | Function;

type TSubscribingFunction = <T>(
  channel: TChannelName,
  handler: T extends Function ? T : Function,
) => void | Function;

//Provide an app wide pub sub context
export const DefaultPubSubContext = createContext(null);

export const usePubSub = <T>(context: T extends Context<{}> ? T : Context<T>) => {
  let PubSubContext: unknown;

  if (context !== undefined) PubSubContext = context;
  else PubSubContext = DefaultPubSubContext;
  const [_, dispatch] = useReducer(
    (state: InitialState, action: TActions) => {
      const current = { ...state };
      switch (action.type) {
        case 'Subscribe':
          current.channels = { ...state.channels };

          let handlers = current.channels[action.channel] || [];
          handlers = [...handlers];

          handlers.push(action.handler);
          current.channels[action.channel] = handlers;
          break;
        case 'Unsubscribe':
          //current.channels = { ...state.channels };
          let unsubHandlers = current.channels[action.channel] || [];
          unsubHandlers = [...unsubHandlers];

          const i = unsubHandlers.indexOf(action.handler);
          if (i > -1) unsubHandlers.splice(i, 1);

          current.channels[action.channel] = unsubHandlers;

          break;
        case 'Publish':
          const channel = current.channels[action.channel] || [];
          for (let i = 0; i < channel.length; i++) {
            channel[i](action.message);
          }
        default:
          //Return exiting state
          return state;
      }
      return current;
    },
    { channels: {} },
  );
  const ref = useRef({ dispatch });
  useEffect(() => {
    ref.current = { dispatch };
  }, [dispatch]);

  const unsubscribe: TSubscribingFunction = (channel, handler) => {
    if (!ref.current) return () => {};
    ref.current.dispatch({ type: 'Unsubscribe', channel, handler });
  };

  const subscribe: TSubscribingFunction = (channel, handler) => {
    if (!ref.current) return () => {};
    ref.current.dispatch({ type: 'Subscribe', channel, handler });
    return () => unsubscribe(channel, handler);
  };

  const publish: TPublishFunction = (channel, message) => {
    if (!ref.current) return () => {};
    ref.current.dispatch({ type: 'Publish', channel, message });
  };
  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish,
    PubSubContext,
  };
};
