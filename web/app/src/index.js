{/*---------------- lib ที่เรียกใช้ภายใน index.js ------------------ */}
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import RegAdmin from './pages/AdminReg'
import Product from './pages/product';
import Adminlogin from './pages/Adminlogin';
import Memberlogin from './pages/Memberlogin';
import Owner from './pages/Owner';
import Editproduct from './pages/Edit';
import EditAdmin from './pages/AdminEditlogin';
import Dashboard from './pages/Dashboard';
import Allproduct from './pages/Admin All product';
import{
    createBrowserRouter,
    RouterProvider,
}from "react-router-dom"
{/*---------------- สร้างตัวแปร router สำหรับการลิงค์หน้าต่างๆ ------------------ */}
const router = createBrowserRouter([
    {
        path: "/",
        element: <Adminlogin />
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

{/*---------------- ส่งค่าไปกลับไปยัง index.html ------------------ */}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

reportWebVitals();
