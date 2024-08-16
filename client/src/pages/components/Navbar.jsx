import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import SearchBar from './SearchBar'

function Navbar() {
  const {user, setUser} = useContext(AppContext)
  return (
    <nav>
        <h1 className="app-title">
            App Title
        </h1>

        {!user ? '' : <SearchBar />}

        <div className="app-links">
            <ul>
                {!user ? '' :<li className='profile-link'>
                <img src={jwtDecode(user).user.image} alt="user's image" className='profile-img'/>
                <ul className="dropdown">
                  <li>User page</li>
                  <li>Notifications</li>
                </ul>
                </li>}
            </ul>
        </div>
        {/* <div className="user-image">
          <img src={users.image} alt="user's image" className='profile-img'/>
        </div> 
        to={`/user/${jwtDecode(user).user._id}`}*/}
    </nav>
  )
}

export default Navbar