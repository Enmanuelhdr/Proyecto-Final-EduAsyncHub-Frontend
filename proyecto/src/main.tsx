import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from './api/UserLogin.tsx'
import { HomePage } from './pages/home/home.tsx'
import { DashBoard } from './pages/dashboard/dashboard.tsx'
import './_custom-variables.scss';




const router= createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/dashboard',
    element: <DashBoard/>
  },
  {
    path:'login',
    element: <UserLogin/>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)