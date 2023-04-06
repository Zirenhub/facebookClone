import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ProfilePage from '../pages/ProfilePage';
import ErrorPage from '../pages/ErrorPage';

import ProtectedRoute from '../components/ProtectedRoute';
import DesktopHeader from '../components/HOC/DesktopHeader';
import HomePage from '../pages/Desktop/HomePage';

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <DesktopHeader />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/:id',
        element: <ProfilePage isMobile={false} />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <AuthPage />,
  },
]);

export default router;
