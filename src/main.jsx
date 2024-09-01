import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './Components/SignUp/SignUp.jsx';
import SignIn from './Components/SignIn/SignIn.jsx';
import AuthProvider from './Components/Providers/AuthProvider.jsx';
import UserDetails from './Components/UsersDetails/UserDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/users/:id",
    element: <SignIn></SignIn>,
    loader:({params})=>fetch(`https://management-server-nu.vercel.app/users/${params.id}`)
  },
  {
    path: '/allusers',
    element: <UserDetails></UserDetails>,
    loader:()=> fetch('https://management-server-nu.vercel.app/users')
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> <RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)
