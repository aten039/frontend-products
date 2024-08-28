import { lazy, Suspense } from 'react';
import {createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import { action as NewProductAction } from './views/NewProducts';
import { loader as productLoader, action as deleteAction, actionAvailability} from './views/Products';
import { loader as editLoader , action as editAction} from './views/EditProduct';
const Products = lazy(()=> import('./views/Products'));
const NewProducts = lazy(()=> import('./views/NewProducts'));
const EditProduct = lazy(()=> import('./views/EditProduct'));

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                index: true,
                element: <Suspense ><Products/></Suspense>,
                loader:productLoader,
                action: actionAvailability
            },
            {
                path: '*',
                element: <Suspense ><Products/></Suspense>,
                loader:productLoader,
            },
            {
                path:'productos/nuevos',
                element: <Suspense><NewProducts/></Suspense>,
                action: NewProductAction
            },
            {
                path:'productos/:id/edit',
                element: <Suspense><EditProduct/></Suspense>,
                action: editAction,
                loader: editLoader
            },
            {
                path:'productos/:id/delete',
                action: deleteAction
            }
        ]
    }   
])