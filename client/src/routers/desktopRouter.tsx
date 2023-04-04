import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ProfilePage from '../pages/ProfilePage';
import ErrorPage from '../pages/ErrorPage';

import ProtectedRoute from '../components/ProtectedRoute';
import DesktopHeader from '../components/HOC/DesktopHeader';

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
        element: <div>Desktop homepage here</div>,
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
