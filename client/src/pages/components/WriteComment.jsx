import React, { useContext, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import * as faIcons from 'react-icons/fa'
import UploadPostImage from './UploadPostImage'
import AppContext from '../../context/AppContext'
import Emoji from './Emoji'

function WriteComment({postId, userId}) {
  const [images, setImages] = useState([])
  const [text, setText] = useState('')
  const [video, setVideo] = useState('')
  const [link, setLink] = useState('')
  const [emojiToggle, setEmojiToggle] = useState(true)
  const [textBox, setTextBox] = useState(true)
  const [linkBox, setLinkBox] = useState(false)
  const [videoBox, setVideoBox] = useState(false)
  const [imgBox, setImgBox] = useState(false)

  const {user} = useContext(AppContext)
  const navigate = useNavigate()

  const handleSumbmit = (e) => {
    e.preventDefault()
    const post = {userId: userId, text: text, link: link, video: video, pics: images}
    try{
      axios.post(`http://localhost:3000/api/comment/${postId}/create`, post, {headers: {'Content-Type': 'application/json'}})
    }catch(err){
      console.log(err)
      toast.error('There was an error making this comment.')
    }
  }

  return (
    <div className='write-comment'>
        <form method="POST" onSubmit={handleSumbmit} className='create-post-form'>

          <fieldset className={`${textBox ? '' : 'hidden'} comment-field`}>
            <div className="emoji-container-btn">
            <faIcons.FaSmile className='emoji-icon' onClick={() => {setEmojiToggle(!emojiToggle)}}/>
            </div>
            <Emoji hidden = {emojiToggle} text={text} setText={setText} setEmoji={setEmojiToggle}/>
            <textarea name="text" id="text" cols="30" rows="3" placeholder='Write your post' value={text} onChange={(e) => setText(e.target.value)}></textarea>
          </fieldset> 

          <input className={`${videoBox ? '' : 'hidden'}`} type="text" name="video" id="video" value={video} onChange={(e) => setVideo(e.target.value)}placeholder='Video link'/>
          <input className={`${linkBox ? '' : 'hidden'}`} type="text" name="link" id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder='Link'/>
          <UploadPostImage setImage = {setImages} imgBox={imgBox}/>
          <button>Post</button>
          </form>
          <div className="post-links">
          <ul className='links'>
            <li className='comment-link' onClick={() => setTextBox(!textBox)}>Text</li>
            <li className='comment-link' onClick={() => setImgBox(!imgBox)}>Image</li>
            <li className='comment-link' onClick={() => setVideoBox(!videoBox)}>Video</li>
            <li className='comment-link' onClick={() => {setLinkBox(!linkBox)}}>Link</li>
          </ul>
          </div>
    </div>
  )
}

export default WriteComment