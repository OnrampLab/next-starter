import React from 'react';
import { usePubSub } from '../hooks';

export const AppProvider = props => {
  const { PubSubContext, publish, subscribe, unsubscribe } = usePubSub();

  return (
    <PubSubContext.Provider
      {...(props as any)}
      value={{ publish, subscribe, unsubscribe }}
    />
  );
};
