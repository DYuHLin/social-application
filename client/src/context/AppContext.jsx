import { createContext, useState, useEffect } from "react"
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const getInitialState = () => {
        const localUser = Cookies.get('tokens')
        return localUser ? localUser : false
    };
    const [user, setUser] = useState(getInitialState)
    const defaultPic = 'https://res.cloudinary.com/dqdoxrm2x/image/upload/v1720614729/jml8pug0wuzmtv95yvwf.jpg'

    const ProtectedRoutes = () => {
        return(
            user === false ? (<Navigate to='/login' />) : user ? (<Outlet />) : ''
        )
    }
    
    return(
        <AppContext.Provider value={{ProtectedRoutes, user, setUser, defaultPic}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext