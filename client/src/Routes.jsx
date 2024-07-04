import React from 'react'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import App from './App'

function Routes() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<App />}>
            
        </Route>
    ))

  return <RouterProvider router={router} />
}

export default Routes