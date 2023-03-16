import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import { SocketContextProvider } from './context/socketContext';
import './index.css';

import mobileRouter from './routers/mobileRouter';
import desktopRouter from './routers/desktopRouter';

const isMobile = window.innerWidth <= 500;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketContextProvider>
          <RouterProvider router={isMobile ? mobileRouter : desktopRouter} />
          {/* <ReactQueryDevtools /> */}
        </SocketContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
