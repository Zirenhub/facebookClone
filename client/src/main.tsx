import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import './index.css';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';
import MobileHeader from './components/HOC/MobileHeader';
import MobileHomePage from './pages/Mobile/HomePage';
import DesktopHomePage from './pages/Desktop/HomePage';

const isMobile = window.innerWidth <= 500;

const mobileRouter = createBrowserRouter([
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
    ],
  },
  {
    path: '/',
    element: <AuthPage />,
  },
]);

const desktopRouter = createBrowserRouter([
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <DesktopHomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/:id',
    element: (
      <ProtectedRoute>
        <ProfilePage isMobile={false} />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <AuthPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {isMobile ? (
          <RouterProvider router={mobileRouter} />
        ) : (
          <RouterProvider router={desktopRouter} />
        )}
        <ReactQueryDevtools />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
