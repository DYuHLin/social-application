import React, { useContext, useState } from 'react'
import UploadPostImage from './components/UploadPostImage'
import AppContext from '../context/AppContext'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import * as faIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import Emoji from './components/Emoji'

function CreatePost() {
  const [images, setImages] = useState([])
  const [text, setText] = useState('')
  const [video, setVideo] = useState('')
  const [link, setLink] = useState('')
  const [hidden, setHidden] = useState('hidden')
  const [emojiToggle, setEmojiToggle] = useState(true);

  const {user} = useContext(AppContext)
  const navigate = useNavigate()

  const handleSumbmit = (e) => {
    e.preventDefault()
    const decoded = jwtDecode(user)
    const post = {userId: decoded.user._id, text: text, link: link, video: video, pics: images}
    try{
      axios.post('http://localhost:3000/api/posts/create', post, {headers: {'Content-Type': 'application/json'}})
      // toast.success("You have posted this blog successfully");
      // navigate('/');
    }catch(err){
      console.log(err)
      toast.error('There was an error making this post.')
    }
  }

  return (
    <section>
        <h1>Post</h1>
        <form method="POST" onSubmit={handleSumbmit} className='create-post-form'>

          <fieldset>
            <div className="emoji-container-btn">
            <faIcons.FaSmile className='emoji-icon' onClick={() => {setEmojiToggle(!emojiToggle)}}/>
            </div>
            <Emoji hidden = {emojiToggle} text={text} setText={setText} setEmoji={setEmojiToggle}/>
            <textarea name="text" id="text" cols="30" placeholder='Write your post' value={text} onChange={(e) => setText(e.target.value)}></textarea>
          </fieldset> 

          <input type="text" name="video" id="video" value={video} onChange={(e) => setVideo(e.target.value)}placeholder='Video link'/>
          <input type="text" name="link" id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder='Link'/>
          <UploadPostImage setImage = {setImages}/>
          <button>Post</button>
        </form>
        <div className="post-links"></div>
    </section>
  )
}

export default CreatePost