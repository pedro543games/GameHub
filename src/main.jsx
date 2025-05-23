import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import Home from './Home.jsx'
import Termo from './Termo.jsx'


const router = createBrowserRouter([
  { path: "/", element: <Termo /> },
  { path: "/Termo", element: <Termo /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
