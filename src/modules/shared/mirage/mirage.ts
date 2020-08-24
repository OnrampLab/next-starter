import { Server } from 'miragejs';
import MOCK_JSON, { ModelsDeclaration, RoutesRegistration } from '../__mock__';

export function makeServer({ environment = 'test' } = {}) {
  const server = new Server({
    environment,
    models: ModelsDeclaration,
    seeds(server) {
      for (const resourceName in ModelsDeclaration) {
        for (const resource of MOCK_JSON[`${resourceName}s`]) {
          server.create(resourceName, resource);
        }
      }
    },
    routes() {
      this.urlPrefix = `${process.env.API_URL?.replace(/(.[^\/])$/, '$1/')}`;
      this.namespace = 'api';

      const registerCRUD = resource => {
        this.get(`/${resource}`, schema => {
          return {
            data: schema[resource].all().models,
          };
        });

        this.post(`/${resource}`, (schema, request) => {
          return {
            data: [schema[resource].create(JSON.parse(request.requestBody))],
          };
        });

        this.patch(`/${resource}/:id`, (schema, request) => {
          const { id } = request.params;

          schema[resource].find(id).update(JSON.parse(request.requestBody));

          return {
            message: 'success',
          };
        });

        this.delete(`/${resource}/:id`, (schema, request) => {
          const { id } = request.params;

          schema.db[resource].remove(id);

          return {
            message: 'success',
          };
        });
      };

      for (const resourceName in ModelsDeclaration) {
        registerCRUD(`${resourceName}s`);
      }

      const registerRoute = (json: Record<string, any>) => {
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

      for (const route in RoutesRegistration) {
        registerRoute(RoutesRegistration[route]);
      }
    },
  });

  return server;
}
