import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';
import {QueryClient, QueryClientProvider,} from 'react-query'

const queryClient = new QueryClient()

const theme = createTheme({
    /** Put your mantine theme override here */
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
              <App />
          </MantineProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
