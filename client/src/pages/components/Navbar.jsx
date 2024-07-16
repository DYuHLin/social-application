import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'

function Navbar() {
  const {user, setUser} = useContext(AppContext)
  return (
    <nav>
        <h1 className="app-title">
            App Title
        </h1>

        <div className="app-links">
            <ul>
                <li>Profile</li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar