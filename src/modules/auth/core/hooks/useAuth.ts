import React, { useEffect } from 'react';
import { selectAuthState, selectAuthData, selectCurrentUser } from '../';
import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import { AuthState, SESSION_KEY, resolveAuthState } from '../redux';

// to be used in app
export const useAuth = () => {
  const state = useSelector(selectAuthState), data = useSelector(selectAuthData), user = useSelector(selectCurrentUser);

  return {
    state, 
    data, 
    user, 
    isResolved: state !== AuthState.Prepare, 
    isAuthroized: state === AuthState.Authorized,
    isPending: state === AuthState.Pending,
    // be care that !isAuthroized !== Unauthorized
    isUnAuthroized: state === AuthState.Unauthorized,
  };
}

// to be used in app
export const useAuthEffect = () => {
  const { state, data, user, isResolved, isAuthroized, isUnAuthroized } = useAuth();

  usePersistAuthEffect(data);
  useRedirectAuthEffect(isResolved, isAuthroized);
};

//@toRedirect: other condition to decide if i want redirect or not, default to be always redirect if resolved.
export const useRedirectAuthEffect = (isResolved: boolean, isAuthroized: boolean, toRedirect: boolean = true) => {
  const router = useRouter();
  const isAuthPage = router.pathname.includes('/auth/');

  useEffect(() => {
    if(isResolved && toRedirect) {
      //redirect to Home if authed & visiting auth page
      if(isAuthroized && isAuthPage) 
        router.push('/');

      //redirect to Login if unauth & not visiting auth page
      if(!isAuthroized && !isAuthPage) 
        router.push('/auth/signin');
    }
  }, [isResolved, toRedirect, isAuthroized, isAuthPage]);
}

export const usePersistAuthEffect = (data) => {
  useResolveAuthEffect();
  useAuthStorageEffect(data);
}

export const useAuthStorageEffect = (data) => {
  useEffect(() => {
    console.log('data changed', data)

    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }, [data]);
}

export const useResolveAuthEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //resolve token
    dispatch(resolveAuthState());
  }, []);  
}
