import { lazy, Suspense } from 'react';
import {createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import { action as NewProductAction } from './views/NewProducts';
const Products = lazy(()=> import('./views/Products'));
const NewProducts = lazy(()=> import('./views/NewProducts'));



 

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                index: true,
                element: <Suspense><Products/></Suspense>
            },
            {
                path:'productos/nuevos',
                element: <Suspense><NewProducts/></Suspense>,
                action: NewProductAction
            }
        ]
    }   
])