import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import AppContext from '../../context/AppContext'
import { jwtDecode } from 'jwt-decode'

function Users() {
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState('')
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)

    useEffect(() => {
    axios.get(`http://localhost:3000/api/auth/getusers`, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setUsers(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this user')
      })
    },[])

    const follow = (userId) => {
      axios.put(`http://localhost:3000/api/auth/${decoded.user._id}/follow`, {followerId: userId}, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setStatus(res.data)
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
    <div className='user-pane'>
        {
        users.map((user, key) => {
            return(
                <div className="user-pane-info" key={key}>
                    <div className="user-detail">
                      <div className="img-round">
                        <img src={user.image} alt="user's image" className='profile-img'/>
                      </div>   
                        <p>{user.username}</p>
                    </div>
                    <button className="user-follow" onClick={() => follow(user._id)}>{decoded.user.followers.some((ind) => ind.user._id === user._id) ? 'Following' : 'Follow'}</button>
                </div>
            )
        })
        }
    </div>
  )
}

export default Users