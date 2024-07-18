import React, { useContext, useState } from 'react'
import UploadPostImage from './components/UploadPostImage'
import AppContext from '../context/AppContext'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function CreatePost() {
  const [images, setImages] = useState([])
  const [text, setText] = useState('')
  const [video, setVideo] = useState('')
  const [link, setLink] = useState('')

  const {user} = useContext(AppContext)
  const navigate = useNavigate()

  const handleSumbmit = (e) => {
    e.preventDefault()
    const decoded = jwtDecode(user)
    const post = {user: decoded.user._id, text: text, link: link, video: video, pics: images}
    try{
      axios.post('http://localhost:3000/api/auth/posts/create', post, {headers: {'Content-Type': 'application/json'}})
      toast.success("You have posted this blog successfully");
      navigate('/');
    }catch(err){
      console.log(err)
      toast.error('There was an error making this post.')
    }
  }

  return (
    <section>
        <h1>Post</h1>
        <form method="POST" onSubmit={handleSumbmit}>
          <textarea name="text" id="text" cols="30" placeholder='Write your post'></textarea>
          <input type="text" name="video" id="video" />
          <input type="text" name="link" id="link" />
          <UploadPostImage setImage = {setImages}/>
          <button>Post</button>
        </form>
    </section>
  )
}

export default CreatePost