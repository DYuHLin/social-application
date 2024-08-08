import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AppContext from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import LikeButton from './components/LikeButton'
import Comments from './components/Comments'

function Post() {
  let { id } = useParams()
  const [post, setPost] = useState(false)
  const [comments, setComments] = useState([])
  const {user} = useContext(AppContext)
  const decoded = jwtDecode(user)

  useEffect(() => {
    axios.get(`http://localhost:3000/api/posts/${id}`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPost(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this post')
      })
  },[]) 
  useEffect(() => {
    axios.get(`http://localhost:3000/api/comment/comments`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setComments(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the comments')
      })
  },[comments])

  return (
    <section>
      {!post ? '' : <div className="post-container">
      <div className="poster-info">
        <h4 className="poster">{post.user.username}</h4>
        <span className="post-date">{new Date(post.date).toLocaleString()}</span>
      </div>
      <div className="post-content">
        {
          post.text.trim() != '' ? <p>{post.text}</p> : ''
        }
        {
          post.link.trim() != '' ? <p>{post.link}</p> : ''
        }
        {
          post.video.trim() != '' ? <p>{post.video}</p> : ''
        }
        {
        post.pics.length != 0 ? 
        <section className="img-container">
          <div className="slider-wrapper">
            <div className="slider">
              {post.pics.map((pic, id) => {
                return(
                  <img id={`slide-${id}`} src={pic} alt="posts image" key={id}/>
                )
              })}
            </div>
            <div className="slider-nav">
            {post.pics.map((pic, id) => {
                return(
                  <a href={`#slide-${id}`} key={id}></a>
                )
              })}
            </div>
          </div>
        </section> : ''
        }
      </div>
      <div className="post-stuff">
        <LikeButton postId = {post._id} post={post}/>
        <div className="comment-count"><p>{comments.filter((com) => {return com.reply == post._id}).length}</p><Link to={`/${post._id}`}>Comments</Link></div>  
      </div>
    </div>}
    <Comments postId={id} userId={decoded.user._id}/>
    </section>
  )
}

export default Post