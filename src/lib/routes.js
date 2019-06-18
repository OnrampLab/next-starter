import {
  AlertCircle,
  Bold,
  Droplet,
  Gift,
  HelpCircle,
  Home,
  Image,
  Link,
  MapPin,
  MessageCircle,
  Navigation,
  PieChart,
  Sidebar,
  Terminal,
  Type,
  Underline,
  User
} from 'react-feather';

export default [
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
        name: 'Calendar'
      },
    ]
  },
];
