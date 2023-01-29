import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ProfilePage from '../pages/ProfilePage';
import ErrorPage from '../pages/ErrorPage';

import ProtectedRoute from '../components/ProtectedRoute';
import MobileHeader from '../components/HOC/MobileHeader';

import MobileHomePage from '../pages/Mobile/HomePage';
import Menu from '../pages/Mobile/Menu';
import Friends from '../pages/Mobile/Friends';

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <MobileHeader />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <MobileHomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/:id',
        element: (
          <ProtectedRoute>
            <ProfilePage isMobile />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/menu',
        element: (
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        ),
      },
      {
        path: '/friends',
        element: (
          <ProtectedRoute>
            <Friends />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <AuthPage />,
  },
]);

export default router;
