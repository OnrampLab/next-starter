import React, { ReactElement } from 'react';
import { Home, Server } from 'react-feather';
import { UserRoleName } from '@onr/user';

export interface MenuItem {
  name: string;
  path?: string;
  icon?: ReactElement;
  children?: MenuItem[];
  roles?: UserRoleName[];
}

export const menuItems: MenuItem[] = [
  {
    path: '/',
    name: 'Home',
    icon: <Home strokeWidth={1} size={16} />,
  },
  {
    name: 'Admin',
    icon: <Server strokeWidth={1} size={16} />,
    roles: [UserRoleName.SystemAdmin],
    children: [
      {
        path: '/admin/accounts',
        name: 'Accounts',
      },
      {
        path: '/admin/users',
        name: 'Users',
      },
    ],
  },
];
