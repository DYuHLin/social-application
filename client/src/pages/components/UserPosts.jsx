import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import DeletePost from './EditDelete/DeletePost'
import axios from 'axios'
import {toast} from 'react-toastify'
import AppContext from '../../context/AppContext'
import { jwtDecode } from 'jwt-decode'

function UserPosts({loading, posts, id}) {
  const [toggle, setToggle] = useState(false)
  const [ids, setId] = useState(false)
  const [post, setPost] = useState(false)
  const {user} = useContext(AppContext)
  const decoded = jwtDecode(user)

  const togglePopup = (id) => {
    setToggle(!toggle)
    setId(id)
    axios.get(`http://localhost:3000/api/posts/${id}`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPost(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this post')
      })
  }
  
  return (
    <>
    {
        loading && posts.length === 0 ? <p>Loading the posts...</p> :
        posts.length === 0 ? <p>This user has no posts</p>:
        posts.map((post, key) => {
          return(
          <div className="post-container" key={key}>
            <div className="poster-info">
              <Link to={`/user/${post.user._id}`} className="poster">{post.user.username}</Link>
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
              <Link to={`/${post._id}`}>Comments</Link>
              {decoded.user._id == post.user._id ? <button onClick={() => togglePopup(post._id)}>Delete</button> : ''}
              {decoded.user._id == post.user._id ? <Link to={`/${post._id}/update`}>Update</Link> : ''}
            </div>
          </div>
          )
        })
      } 
      <DeletePost toggle={toggle} setToggle={setToggle} post={post}/>
    </>
  )
}

export default UserPosts