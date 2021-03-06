import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { useAuth, useAuthEffect, getCurrentUser } from '@onr/auth';

export const AuthWrapper: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthroized, isResolved } = useAuth();

  useAuthEffect();

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
