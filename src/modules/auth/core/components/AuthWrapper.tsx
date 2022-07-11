import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { useAuth, useAuthEffect, getCurrentUser } from '@onr/auth';

export const AuthWrapper: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthorized, isResolved } = useAuth();

  useAuthEffect();

  useEffect(() => {
    if(isAuthorized)
      dispatch(getCurrentUser())
  }, [isAuthorized]);

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
