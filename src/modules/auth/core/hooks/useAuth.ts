import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { selectAuthState, selectAuthData, selectCurrentUser, AuthState, SESSION_KEY, resolveAuthState } from '@onr/auth';

export const useAuth = () => {
  const state = useSelector(selectAuthState), data = useSelector(selectAuthData), user = useSelector(selectCurrentUser);

  return {
    state,
    data,
    user,
    isResolved: state !== AuthState.Prepare,
    isAuthorized: state === AuthState.Authorized,
    isPending: state === AuthState.Pending,
    // be care that !isAuthorized !== Unauthorized
    isUnAuthorized: state === AuthState.Unauthorized,
  };
}

export const useAuthEffect = () => {
  const { state, data, user, isResolved, isAuthorized, isUnAuthorized } = useAuth();

  usePersistAuthEffect(data);
  useRedirectAuthEffect(isResolved, isAuthorized);
};

//@toRedirect: other condition to decide if i want redirect or not, default to be always redirect if resolved.
export const useRedirectAuthEffect = (isResolved: boolean, isAuthorized: boolean, toRedirect: boolean = true) => {
  const router = useRouter();
  const isAuthPage = router.pathname.includes('/auth/');

  useEffect(() => {
    if(isResolved && toRedirect) {
      //redirect to Home if authed & visiting auth page
      if(isAuthorized && isAuthPage)
        router.push('/');

      //redirect to Login if unauth & not visiting auth page
      if(!isAuthorized && !isAuthPage)
        router.push('/auth/signin');
    }
  }, [isResolved, toRedirect, isAuthorized, isAuthPage]);
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
