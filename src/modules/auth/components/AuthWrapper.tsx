import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { useJWTAuth, useJWTAuthEffect, getCurrentUser } from '../';

export const AuthWrapper: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthroized, isResolved } = useJWTAuth();

  useJWTAuthEffect();

  useEffect(() => {
    if(isAuthroized) 
      dispatch(getCurrentUser())
  }, [isAuthroized]);

  if(!isResolved) {
    return (
      <Spin>
        <div style={{height: '100vh', width: '100vw'}}/>
      </Spin>
    )
  }
  return (
    <>
      {children}
    </>
  )
}
