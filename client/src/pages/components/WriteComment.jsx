import React, { useContext, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import * as faIcons from 'react-icons/fa'
import UploadPostImage from './UploadPostImage'
import AppContext from '../../context/AppContext'
import Emoji from './Emoji'
import * as ciIcons from 'react-icons/ci'

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

  const toggle = (name) => {
    if(name === 'txt'){
      setImgBox(false)
      setVideoBox(false)
      setLinkBox(false)
    } else if(name === 'img'){
      setImgBox(true)
      setVideoBox(false)
      setLinkBox(false)
    } else if(name === 'vid'){
      setImgBox(false)
      setVideoBox(true)
      setLinkBox(false)
    } else{
      setImgBox(false)
      setVideoBox(false)
      setLinkBox(true)
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

          <input className={`${videoBox ? '' : 'hidden'} inputs`} type="text" name="video" id="video" value={video} onChange={(e) => setVideo(e.target.value)}placeholder='Video link'/>
          <input className={`${linkBox ? '' : 'hidden'} inputs`} type="text" name="link" id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder='Link'/>
          <UploadPostImage setImage = {setImages} imgBox={imgBox}/>
          <button>Post</button>
          </form>
          <div className="post-links">
          <ul className='links'>
            <li className='comment-link' onClick={() => toggle('img')}><ciIcons.CiImageOn className='icons'/></li>
            <li className='comment-link' onClick={() => toggle('vid')}><ciIcons.CiVideoOn className='icons'/></li>
            <li className='comment-link' onClick={() => toggle('lnk')}><ciIcons.CiLink className='icons'/></li>
          </ul>
          </div>
    </div>
  )
}

export default WriteComment