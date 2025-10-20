import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './Router/router'
import './index.css'
import AuthProvider from './Contexts/AuthContext/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className=''>
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
