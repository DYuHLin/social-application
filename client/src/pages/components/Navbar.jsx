import React, { useContext, useEffect, useRef, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import SearchBar from './SearchBar'
import axios from 'axios'
import {toast} from 'react-toastify'
import NotificationPopup from './NotificationPopup'

function Navbar() {
  const {user, setUser} = useContext(AppContext)
  const [notifications, setNotifications] = useState([])
  const [toggle2, setToggle2] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [menu, setMenu] = useState(false)

    const notifcationPop = () => {
      if(user === false){
        return
      } else {
        axios.get(`http://localhost:3000/api/notifications/${jwtDecode(user).user._id}`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setNotifications(res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the notifications')
      })
      }
    }

  return (
    <>
      <nav>
        <h1>Clones</h1>

          <div className="app-links">
            {!user ? '' :<div className='profile-link'>
            <ul className={`dropdown ${menu == false ? '' : 'dropdown-active'}`}>
              <li><Link to={`/user/${jwtDecode(user).user._id}`}>Profile</Link></li>
              <li onClick={() => {setToggle2(true); notifcationPop();}}>Notifications</li>
              <li onClick={() => {setToggle(true);}}>Search</li>
            </ul>
            <img src={jwtDecode(user).user.image} alt="user's image" className='profile-img' onClick={() => setMenu(!menu)}/>
            </div>}           
          </div>
      </nav>
      <NotificationPopup toggle={toggle2} setToggle={setToggle2} notifications={notifications} setNotifications={setNotifications}/>
      {!user ? '' : <SearchBar toggle={toggle} setToggle={setToggle}/>}
    </>
  )
}

export default Navbar