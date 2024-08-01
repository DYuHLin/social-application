import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

function DeletePost({toggle, setToggle, post}) {

  const deletePost = (id) => {

  }

  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            {post === false ? '' :<div className={`popup-content`}>
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <h1>Delete Post</h1>
                <div className={`popup-fow-container`}>
                  <p>Are you sure you want to delete this post?</p>
                  {
                    post.text.trim() != '' ? <p>{post.text}</p> : ''
                  }
                  {
                    post.pics.length == 0 ? '' :<p>{post.pics.length} images</p>
                  }
                  {
                    post.link.trim() != '' ? <a>{post.link}</a> : ''
                  }
                  {
                    post.video.trim() != '' ? <video>{post.video}</video> : ''
                  } 
                </div>
            </div>}
        </div>
    </div>
  )
}

export default DeletePost