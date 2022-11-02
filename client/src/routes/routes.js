import { Board } from '../components/Board';
import { Login } from '../views/Login';
import { Signup } from '../views/Signup';
import { Profile } from '../views/Profile';

const publicRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
];

const authenticatedRoutes = [
  {
    path: '/',
    component: Profile,
  },
  {
    path: '/board/:id',
    component: Board,
  },
  {
    path: '/profile',
    component: Profile,
  },
];

export { publicRoutes, authenticatedRoutes };
