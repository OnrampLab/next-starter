Core

AuthWrapper
   - call useAuth & useAuthEffect & getCurrentUser when authorized

useAuth
   - return the auth status with state, data, user and isResolved, isAuthorized, isPending, isUnAuthorized.

useAuthEffect: control the effect corresponding to different auth status
   - resolve previous session from localStorage with SESSION_KEY as key
   - redirect to auth if not authorized
   - redirect to home if authorized but visting auth-related pages

Note on customization:
   - you could overide AuthWrapper, useAuth, useAuthEffect, AuthService or any other actions by exporting relevant custom code here
   - you can import core functions or hooks from '@onr/auth/core' if necessary

Note on developing sub-modules:
   - you can import core functions or hooks from '@onr/auth/core'
   - try to export or import from '@onr/aut', so others can override for customization


JWT

AuthService
   - To implement loginwithJWT for refreshing token

refreshToken
   - To Control the flow of refreshing token

resolveJWTAuthState
   - to refresh token after resolving from local storage

AuthState
   - to extend core AuthState with NeedRefresh to denote token expire

useExpireEffect
   - to set correspoding auth state when token expires
   - to prompt warning message and refresh token

useJWTAuth
   - to return isNeedRefresh

useJWTAuthEffect
   - to use resolveJWTAuthState & useExpireEffect
