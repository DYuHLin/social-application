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

    const ProtectedRoutes = () => {
        return(
            user === false ? (<Navigate to='/login' />) : user.accessToken ? (<Outlet />) : ''
        )
    }
    
    return(
        <AppContext.Provider value={{ProtectedRoutes, user, setUser}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext