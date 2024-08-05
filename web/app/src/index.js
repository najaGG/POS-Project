import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import RegAdmin from './pages/AdminReg'
import Product from './pages/product';
import Adminlogin from './pages/Adminlogin';
import Memberlogin from './pages/Memberlogin';
import Owner from './pages/Owner';
import TEST from './pages/TEST';
import Editproduct from './pages/Edit';
import EditAdmin from './pages/AdminEditlogin';
import Dashboard from './pages/Dashboard';
import Allproduct from './pages/Admin All product';

import{
    createBrowserRouter,
    RouterProvider,
}from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Adminlogin />
    },
    {
        path:"/home",
        element: <Home />
    },
    {
        path:"/product",
        element: <Product />
    },
    {
        path:"/RegAdmin",
        element: <RegAdmin />
    },
    {
        path:"/memberlogin",
        element: <Memberlogin />
    },
    {
        path:"/ownerLogin",
        element: <Owner  />
    },
    {
        path:"/TEST",
        element: <TEST  />
    },
    {
        path:"/Editproduct",
        element: <Editproduct />
    },
    {
        path:"/EditAdmin",
        element: <EditAdmin/>
    },
    {
        path:"/Dashboard",
        element: <Dashboard />
    },
    {
        path:"/Allproduct",
        element: <Allproduct />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <RouterProvider router={router} />
);


reportWebVitals();
