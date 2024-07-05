import { createContext, useState, useEffect } from "react"
import { Outlet, Navigate } from 'react-router-dom'

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [user, setUser] = useState(false);

    const ProtectedRoutes = () => {
        return(
            user === false ? (<Navigate to='/login' />) : user.accessToken ? (<Outlet />) : ''
        )
    }
    
    return(
        <AppContext.Provider value={{ProtectedRoutes}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext