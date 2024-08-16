import React, { useContext, useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import * as faIcons from 'react-icons/fa'
import UploadPostImage from './UploadPostImage'
import Emoji from './Emoji'
import * as ciIcons from 'react-icons/ci'

function WriteComment({postId, userId, setComments}) {
  const [images, setImages] = useState([])
  const [text, setText] = useState('')
  const [video, setVideo] = useState('')
  const [tube, setTube] = useState('')
  const [link, setLink] = useState('')
  const [emojiToggle, setEmojiToggle] = useState(true)
  const [textBox, setTextBox] = useState(true)
  const [linkBox, setLinkBox] = useState(false)
  const [videoBox, setVideoBox] = useState(false)
  const [tubeBox, setTubeBox] = useState(false)
  const [imgBox, setImgBox] = useState(false)

  const handleSumbmit = (e) => {
    e.preventDefault()
    const post = {userId: userId, text: text, link: link, video: video, youtube: tube, pics: images}
    try{
      axios.post(`http://localhost:3000/api/comment/${postId}/create`, post, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
          setComments((content) => [...content, res.data])
        })
      setText('')
      setVideo('')
      setTube('')
      setLink('')
      setImages([])

      setLinkBox(false)
      setVideoBox(false)
      setTubeBox(false)
      setImgBox(false)
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
            <textarea className='post-text' name="text" id="text" cols="30" rows="3" placeholder='Write your post' value={text} onChange={(e) => setText(e.target.value)}></textarea>
          </fieldset> 

          <input className={`${videoBox ? '' : 'hidden'} inputs`} type="text" name="video" id="video" value={video} onChange={(e) => setVideo(e.target.value)}placeholder='Video link'/>
          <input className={`${tubeBox ? '' : 'hidden'} inputs`} type="text" name="tube" id="tube" value={tube} onChange={(e) => setTube(e.target.value)}placeholder='Youtube Embed'/>
          <input className={`${linkBox ? '' : 'hidden'} inputs`} type="text" name="link" id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder='Link'/>
          <UploadPostImage setImage = {setImages} imgBox={imgBox}/>
          <button className="user-follow">Post</button>
          </form>
          <div className="post-links">
          <ul className='links'>
            <li onClick={() => {setImgBox(!imgBox); setLinkBox(false); setVideoBox(false); setTubeBox(false);}}><ciIcons.CiImageOn className='icons'/></li>
            <li onClick={() => {setImgBox(false); setLinkBox(false); setVideoBox(!videoBox); setTubeBox(false);}}><ciIcons.CiVideoOn className='icons'/></li>
            <li onClick={() => {setImgBox(false); setLinkBox(false); setVideoBox(false); setTubeBox(!tubeBox);}}><ciIcons.CiYoutube className='icons'/></li>
            <li onClick={() => {setImgBox(false); setLinkBox(!linkBox); setVideoBox(false); setTubeBox(false);}}><ciIcons.CiLink className='icons'/></li>
          </ul>
          </div>
    </div>
  )
}

export default WriteComment