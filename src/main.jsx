import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';
import {QueryClient, QueryClientProvider,} from 'react-query'
import {RouterProvider} from "react-router-dom";
import {router} from "./conf/router.jsx";

const queryClient = new QueryClient()

const theme = createTheme({
    /** Put your mantine theme override here */
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
              <RouterProvider router={router} />
          </MantineProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
