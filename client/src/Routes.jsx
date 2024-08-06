import React, {useContext} from 'react'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import App from './App'
import Register from './pages/Register'
import Login from './pages/Login'
import AppContext from './context/AppContext'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import User from './pages/User'
import UpdatePost from './pages/UpdatePost'
import UpdateComment from './pages/UpdateComment'
import EditProfile from './pages/EditProfile'

function Routes() {

  const {ProtectedRoutes} = useContext(AppContext)

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>

            <Route element={<ProtectedRoutes />}>
                <Route index element={<Home />} />
                <Route path='/post' element={<CreatePost />} />
                <Route path='/editprofile' element={<EditProfile />} />
                <Route path='/:id' element={<Post />} />
                <Route path='/:id/update' element={<UpdatePost />} />
                <Route path='/:id/updatecomment' element={<UpdateComment />} />
                <Route path='/user/:id' element={<User />} />
            </Route>
        </Route>
    ))

  return <RouterProvider router={router} />
}

export default Routes