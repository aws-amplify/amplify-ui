import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Amplify } from 'aws-amplify';
import amplifyConfig from './amplify_outputs';
import { theme } from './theme';
import StorageManagerExample from './routes/storage/storage-manager';
import Root from './routes/root';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(amplifyConfig);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/storage/storage-manager',
        element: <StorageManagerExample />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
