import React, { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { AuthState, setAuthState, resolveJWTAuthState, refreshToken } from '../redux';

import { Modal } from 'antd';

import { useAuth, useAuthStorageEffect, useRedirectAuthEffect } from './useAuth';

export const useJWTAuth = () => {
  const { state, data, user } = useAuth();

  return {
    state, data, user, 
    isResolved: state !== AuthState.Prepare, 
    isAuthroized: state === AuthState.Authorized,
    isPending: state === AuthState.Pending,
    // be care that !isAuthroized !== Unauthorized
    isUnAuthroized: state === AuthState.Unauthorized,
    isNeedRefresh: state === AuthState.NeedRefresh, 
  }
}

export const useJWTAuthEffect = () => {
  const { state, data, user, isResolved, isPending, isAuthroized, isUnAuthroized, isNeedRefresh } = useJWTAuth();

  usePersistJWTAuthEffect(data);
  useRedirectAuthEffect(isResolved, isAuthroized, !isNeedRefresh && !isPending);
  useExpireEffect(data, isAuthroized, isUnAuthroized, isNeedRefresh);
}

export const usePersistJWTAuthEffect = (data) => {
  useResolveJWTAuthEffect();
  useAuthStorageEffect(data);
}

export const useResolveJWTAuthEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resolveJWTAuthState());
  }, []);  
};

const useExpireEffect = (data, isAuthroized: boolean, isUnAuthroized: boolean, isNeedRefresh: boolean) => {
  const dispatch = useDispatch();
  const timerID = useRef(-1);

  useEffect(() => {
    //handle timerID
    if(isAuthroized && data.access_token && timerID.current === -1) {
      timerID.current = setTimeout(() => {
        timerID.current = -1;
        dispatch(setAuthState(AuthState.NeedRefresh));
      }, data.expires_in);
    }
    if(isUnAuthroized && timerID.current !== -1) {
      //clear timeout if logout

      clearTimeout(timerID.current);
      timerID.current = -1
    }
  }, [isAuthroized, isUnAuthroized, data]);

  useEffect(() => {
    //clean up timeout on unmount
    return () => {
      clearTimeout(timerID.current);
    }
  }, []);

  useEffect(() => {
    //handle refresh popup
    if(isNeedRefresh && timerID.current === -1) {
      Modal.warning({
        title: 'This page has expired due to inactivity. Please refresh and try again.',
        onOk: () => {
          const { access_token, email } = data

          dispatch(refreshToken(access_token, email));
        },
      });
    }
  }, [isNeedRefresh, data]);  
} 
