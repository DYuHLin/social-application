import React, { useContext } from 'react'
import axios from 'axios'
import AppContext from '../../context/AppContext'
import {toast} from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

function LikeButtonComment({commentId}) {
    const {user} = useContext(AppContext)
    const likeButton = () => {
        const decoded = jwtDecode(user)
        try{
            axios.put(`http://localhost:3000/api/comment/${commentId}/like`, {userId: decoded.user._id}, {headers: {'Content-Type': 'Application/json'}})
            console.log('liked')
        }catch(err){
            console.log(err)
            toast.error('There was an error liking this comment.')
        }
    }
  return (
    <>
    <button onClick={likeButton}>Like</button>
    </>
  )
}

export default LikeButtonComment