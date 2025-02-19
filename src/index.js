import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from './features/Dashboard';
import Register from "./features/Register";
import Login from "./features/Login";
import Admin from "./features/Admin";
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/Dashboard",
        element:<Dashboard/>
      },
      {
        path: "/Register",
        element:<Register/>
      },
      {
        path: "/Login",
        element:<Login/>
      },
      {
        path:"/Admin",
        element:<Admin/>
      },
      
    ]
  },
]);
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
