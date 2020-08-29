import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { menuItems } from '../';
import { Page } from '@onr/core';
import { getCurrentUser, useJWTAuth, useJWTAuthEffect } from '@onr/auth';

const Container: React.FC = (props) => {
  const { Component, pageProps } = props;
  const dispatch = useDispatch();

  const { isAuthroized } = useJWTAuth();
  useJWTAuthEffect();

  useEffect(() => {
    if(isAuthroized)
      dispatch(getCurrentUser())
  }, [isAuthroized]);

  return (
    <Page 
      {...props}
      menuItems={menuItems} 
    >
      <Component {...pageProps}/>
    </Page>
  );
};

export const PageContainer: React.FC = (props) => {
  //wrap root providers here, if any
  return (
    <Container {...props}/>
  )
}
