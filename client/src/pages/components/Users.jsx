import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
    axios.get(`http://localhost:3000/api/auth/getusers`, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setUsers(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this user')
      })
    },[])

  return (
    <div className='user-pane'>
        {
            users.map((user, key) => {
                return(
                    <div className="user-pane-info" key={key}>
                        <div className="user-detail">
                            <img src={user.image} alt="user's image" className='profile-img'/>
                            <p>{user.username}</p>
                        </div>
                        <button className="user-follow">Follow</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Users