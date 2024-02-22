import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from './api/UserLogin.tsx'




const router= createBrowserRouter([
  {
    path: '/',
    element: <App/>
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