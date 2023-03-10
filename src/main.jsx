import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from './Context/AuthProvider'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
    <ToastContainer autoClose={500} />
  </React.StrictMode>,
)
