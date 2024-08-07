import React, { useContext } from 'react'
import axios from 'axios'
import AppContext from '../../context/AppContext'
import { toast } from 'react-toastify'

function LogoutAndDelete({users}) {
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)

    const logout = () => {
        try{
            axios.post(`http://localhost:3000/api/auth/logout`, {username: decoded.user.username}, {headers: {'Content-Type': 'Application/json'}})
            toast.success('You have successfully logged out')
        }catch(err){
            console.log(err)
            toast.error('There was an error logging out.')
        }
    }

    const deleteAccount = () => {
        try{
            axios.delete(`http://localhost:3000/api/auth/${decoded.user._id}/deleteaccount`, {headers: {'Content-Type': 'Application/json'}})
            toast.success('You have successfully deleted your account')
        }catch(err){
            console.log(err)
            toast.error('There was an error deleting your account.')
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
        <button>Logout</button>
        <button>Delete Account</button>
        <button>Follow</button>
    </div>
  )
}

export default LogoutAndDelete