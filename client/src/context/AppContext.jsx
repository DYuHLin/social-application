import { createContext, useState, useEffect } from "react"
import { Outlet, Navigate } from 'react-router-dom'

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const getInitialState = () => {
        const localUser = decodeURIComponent(document.cookie)
        return localUser ? JSON.parse(localUser) : false
    };
    const [user, setUser] = useState(false)

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