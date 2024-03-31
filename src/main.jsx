import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';
import {QueryClient, QueryClientProvider,} from 'react-query'
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router.jsx";
import { store } from './store/store';
import {Provider} from "react-redux";

const queryClient = new QueryClient()

const theme = createTheme({
    /** Put your mantine theme override here */
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
              <Provider store={store}>
                  <RouterProvider router={router} />
              </Provider>
          </MantineProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
