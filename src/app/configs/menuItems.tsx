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
    name: 'Demo',
    icon: <MessageCircle strokeWidth={1} size={16} />,
    children: [
      {
        path: '/demo/planet',
        name: 'Daily Planet',
      },
      {
        path: '/demo/mars',
        name: 'Mars Photos',
      },
    ],
  },
];
