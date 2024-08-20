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

    useEffect(() => {
      let handler = () => {
        setMenu(false)    
      }

      document.addEventListener('mousedown', handler)
      return() => {document.removeEventListener('mousedown', handler)}
    })

  return (
    <nav>
        <h1 className="app-title">
            App Title
        </h1>

        {!user ? '' : <SearchBar />}

        <div className="app-links">
          {!user ? '' :<div className='profile-link'>
          <img src={jwtDecode(user).user.image} alt="user's image" className='profile-img' onClick={() => setMenu(!menu)}/>
          <ul className={`dropdown ${menu == false ? '' : 'dropdown-active'}`}>
            <li><Link to={`/user/${jwtDecode(user).user._id}`}>User page</Link></li>
            <li onClick={() => {setToggle(true); notifcationPop();}}>Notifications</li>
          </ul>
          </div>}           
        </div>
        <NotificationPopup toggle={toggle} setToggle={setToggle} notifications={notifications}/>
    </nav>
  )
}

export default Navbar