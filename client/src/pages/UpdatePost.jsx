import React, { useContext, useEffect, useState } from 'react'
import UploadPostImage from './components/UploadPostImage'
import AppContext from '../context/AppContext'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import * as faIcons from 'react-icons/fa'
import Emoji from './components/Emoji'
import { useParams, Link } from 'react-router-dom'
import UpdateImages from './components/UpdateImages'

function UpdatePost() {
  const [post, setPost] = useState(false)
  const [images, setImages] = useState([])
  const [text, setText] = useState('')
  const [video, setVideo] = useState('')
  const [link, setLink] = useState('')
  const [emojiToggle, setEmojiToggle] = useState(true)
  const [imgBox, setImgBox] = useState(false)

  const {user} = useContext(AppContext)
  const navigate = useNavigate()
  let { id } = useParams()

  const handleSumbmit = (e) => {
    e.preventDefault()
    const decoded = jwtDecode(user)
    const post = {userId: decoded.user._id, text: text, link: link, video: video, pics: images}
    try{
      axios.post('http://localhost:3000/api/posts/create', post, {headers: {'Content-Type': 'application/json'}})
      toast.success("You have posted this blog successfully");
      navigate('/');
    }catch(err){
      console.log(err)
      toast.error('There was an error making this post.')
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/api/posts/${id}`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPost(res.data)
        setText(res.data.text)
        setVideo(res.data.video)
        setLink(res.data.link)
        setImages(res.data.pics)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this post')
      })
  },[])
  return (
    <section>
        <h1>Post</h1>
        <form method="POST" onSubmit={handleSumbmit} className='create-post-form'>

          <fieldset>
            <div className="emoji-container-btn">
            <faIcons.FaSmile className='emoji-icon' onClick={() => {setEmojiToggle(!emojiToggle)}}/>
            </div>
            <Emoji hidden = {emojiToggle} text={text} setText={setText} setEmoji={setEmojiToggle}/>
            <textarea name="text" id="text" cols="30" rows="5" placeholder='Write your post' value={text} onChange={(e) => setText(e.target.value)}></textarea>
          </fieldset> 

          <input type="text" name="video" id="video" value={video} onChange={(e) => setVideo(e.target.value)}placeholder='Video link'/>
          <input type="text" name="link" id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder='Link'/>
          <UpdateImages images={images} setImages={setImages} id={id}/>
          <button>Update</button>
        </form>
        <div className="post-links">
          <ul className='links'>
            <li onClick={() => setImgBox(!imgBox)}>Image</li>
          </ul>
          </div>
    </section>
  )
}

export default UpdatePost