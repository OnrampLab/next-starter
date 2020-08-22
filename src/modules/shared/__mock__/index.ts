import { Model } from 'miragejs';
import accounts from './account.json';
import users from './user.json';
import auth from './auth.json';

export default {
  accounts,
  users,
};

export const ModelsDeclaration = {
  account: Model,
  user: Model,
};

export const RoutesRegistration = {
  auth,
};
