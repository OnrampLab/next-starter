import React, { ReactElement } from 'react';
import { Home } from 'react-feather';

interface MenuItem {
  name: string;
  path?: string;
  icon?: ReactElement;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    path: '/',
    name: 'Home',
    icon: <Home strokeWidth={1} size={16} />,
  },
];
