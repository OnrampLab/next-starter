import React, { ReactElement } from 'react';
import { Home, MessageCircle, Star } from 'react-feather';

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
  {
    name: 'Apps',
    icon: <MessageCircle strokeWidth={1} size={16} />,
    children: [
      {
        path: '/apps/calendar',
        name: 'Calendar',
      },
    ],
  },
  {
    path: '/demo',
    name: 'Demo',
    icon: <Star strokeWidth={1} size={16} />,
  },
];
