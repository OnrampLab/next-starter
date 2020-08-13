import { Server, Model } from 'miragejs';
import authMeJson from '../assets/mock-data/auth-me.json';

export function makeServer({ environment = 'test' } = {}) {
  const server = new Server({
    environment,
    routes() {
      this.urlPrefix = 'mirage/';
      this.namespace = 'api';

      // auth
      this.post('/auth/login', () => {
        return {
          data: {
            access_token: 'token',
            expires_in: 3600,
            token_type: 'bearer',
          },
        };
      });

      this.post('/auth/logout', () => {
        return;
      });

      this.post('/auth/refresh', () => {
        return {
          data: {
            access_token: 'token',
            expires_in: 3600,
            token_type: 'bearer',
          },
        };
      });

      this.post('/auth/me', () => {
        return authMeJson;
      });
    },
  });

  return server;
}
