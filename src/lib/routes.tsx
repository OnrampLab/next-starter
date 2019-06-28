import {
  Home,
  MessageCircle,
} from 'react-feather';

interface RouteSetting {
  name: string;
  path?: string;
  icon?: any;
  children?: RouteSetting[];
}

const routes: RouteSetting[] = [
  {
    path: '/',
    name: 'Home',
    icon: <Home strokeWidth={1} size={16} />
  },
  {
    name: 'Apps',
    icon: <MessageCircle strokeWidth={1} size={16} />,
    children: [
      {
        path: '/apps/calendar',
        name: 'Calendar',
      },
    ]
  },
];

export default routes;
