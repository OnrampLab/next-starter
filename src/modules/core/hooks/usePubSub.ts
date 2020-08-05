import { createContext, useReducer, useEffect, useRef } from 'react';

//Provide an app wide pub sub context
export const DefaultPubSubContext = createContext();
export const usePubSub = context => {
  let PubSubContext = DefaultPubSubContext;

  if (context !== undefined) PubSubContext = context;
  const [subscriptionManager, dispatch] = useReducer(
    (state, action) => {
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

  const subscribe = (channel, handler) => {
    if (!ref.current) return () => {};
    ref.current.dispatch({ type: 'Subscribe', channel, handler });
    return () => unsubscribe(channel, handler);
  };
  let unsubscribe = (channel, handler) => {
    if (!ref.current) return () => {};
    ref.current.dispatch({ type: 'Unsubscribe', channel, handler });
  };
  const publish = (channel, message) => {
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
