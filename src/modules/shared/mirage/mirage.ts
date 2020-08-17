import { Server } from 'miragejs';
import authMeJson from '@onr/shared/__mock__/auth.json';
import accountJSON from '@onr/shared/__mock__/account.json';
import userJSON from '@onr/shared/__mock__/user.json';

export function makeServer({ environment = 'test' } = {}) {
  const server = new Server({
    environment,
    routes() {
      this.urlPrefix = `${process.env.API_URL?.replace(/(.[^\/])$/, '$1/')}`;
      this.namespace = 'api';
      const readJsonMockFile = (json: Record<string, any>) => {
        const methods: any = {
          post: this.post,
          get: this.get,
          delete: this.delete,
          patch: this.patch,
        };

        for (const methodName of Object.keys(json)) {
          if (methodName in methods) {
            const routes = json[methodName];
            for (const route of Object.keys(routes)) {
              methods[methodName](route, () => routes[route as keyof typeof routes]);
            }
          }
        }
      };

      readJsonMockFile(authMeJson);
      readJsonMockFile(accountJSON);
      readJsonMockFile(userJSON);
    },
  });

  return server;
}
