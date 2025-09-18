import { Home, MonitorDot } from 'lucide-react';
import { MenuItem } from '@/types';
import { APP_ROUTES } from './app-routes';

export const menuItems: MenuItem[] = [
  {
    icon: Home,
    id: 'dashboard',
    label: 'Dashboard',
    href: APP_ROUTES.DASHBOARD,
    children: [],
  },
  {
    icon: MonitorDot,
    id: 'interviews',
    label: 'Interviews',
    href: APP_ROUTES.INTERVIEWS,
    children: [],
  },
  // {
  //   icon: MessageSquareHeart,
  //   id: 'feedback',
  //   label: 'Feedback',
  //   href: APP_ROUTES.FEEDBACK,
  //   children: [],
  // },
];
