import React, { useContext, useState } from 'react'
import axios from 'axios'
import AppContext from '../../context/AppContext'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import DeleteAccount from './EditDelete/DeleteAccount'
import { useNavigate } from 'react-router-dom'

function LogoutAndDelete({users}) {
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()

    const logout = () => {
        try{
            axios.post(`http://localhost:3000/api/auth/logout`, {username: decoded.user.username}, {headers: {'Content-Type': 'Application/json'}})
            toast.success('You have successfully logged out')
            navigate('/login')
        }catch(err){
            console.log(err)
            toast.error('There was an error logging out.')
        }
    }

    const follow = (id) => {
        axios.put(`http://localhost:3000/api/auth/${decoded.user._id}/follow`, {followerId: id}, {headers:{'content-type': 'application/json'}})
            .then((res) => {
            if(res.data === 'deleted'){
            toast.success('You have unfollwed this user')
            } else if(res.data === 'ok'){
            toast.success('You have followed this user')
            }
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error following this user')
      })
    }

  return (
    <div className='btn-group'>
        <button onClick={() => logout()}>Logout</button>
        <button onClick={() => setToggle(!toggle)}>Delete Account</button>
        <button onClick={() => follow(users._id)}>Follow</button>
        <DeleteAccount toggle={toggle} setToggle={setToggle} />
    </div>
  )
}

export default LogoutAndDelete