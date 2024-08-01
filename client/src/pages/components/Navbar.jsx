import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function Navbar() {
  const {user, setUser} = useContext(AppContext)
  return (
    <nav>
        <h1 className="app-title">
            App Title
        </h1>

        <div className="app-links">
            <ul>
                {!user ? '' :<Link to={`/user/${jwtDecode(user).user._id}`}>{jwtDecode(user).user.username}</Link>}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar