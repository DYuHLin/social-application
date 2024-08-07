import React, { useContext } from 'react'
import axios from 'axios'
import AppContext from '../../context/AppContext'
import {toast} from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

function LikeButton({postId, post}) {

    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)

    const likeButton = () => {
        const decoded = jwtDecode(user)
        try{
            axios.put(`http://localhost:3000/api/posts/${postId}/like`, {userId: decoded.user._id}, {headers: {'Content-Type': 'Application/json'}})
            console.log('liked')
        }catch(err){
            console.log(err)
            toast.error('There was an error liking this post.')
        }
    }

  return (
    <>
    <button onClick={likeButton}>{post.likes.some((like) => like.user === decoded.user._id) ? 'Liked' : 'Like'}</button>
    </>
  )
}

export default LikeButton