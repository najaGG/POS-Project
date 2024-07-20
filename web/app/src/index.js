import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import RegAdmin from './pages/AdminReg'
import Product from './pages/product';
import{
    createBrowserRouter,
    RouterProvider,
}from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/adminReg",
        element: <RegAdmin />
    },
    {
        path:"/",
        element: <Home />
    },
    {
        path:"/product",
        element: <Product />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <RouterProvider router={router} />
);


reportWebVitals();
