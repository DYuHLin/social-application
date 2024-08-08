import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import AppContext from '../context/AppContext'
import { useParams, Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import UserPosts from './components/UserPosts'
import UserComments from './components/UserComments'
import Followers from './components/Followers'
import UserLikes from './components/UserLikes'
import LogoutAndDelete from './components/LogoutAndDelete'

function User() {
  const [users, setUsers] = useState(false)
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [postLink, setPostLink] = useState(true)
  const [commentLink, setCommentLink] = useState(false)
  const [likeLink, setLikeLink] = useState(false)
  const [toggle, setToggle] = useState(false)

  const {user} = useContext(AppContext)
  const decoded = jwtDecode(user)
  let { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3000/api/auth/${id}/singleuser`, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setUsers(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this user')
      })
  },[])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/posts/user/${id}`, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this users posts')
      })
  },[])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/comment/user/${id}`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setComments(res.data)
        setLoading2(false)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the comments')
      })
  },[])

  return (
    <section>
      <h2>{users.username}</h2>
      <div className="user-container">
        <div className="user-image">
          <img src={users.image} alt="user's image" className='profile-img'/>
        </div>
        <div className="user-info">
          <div className="user text">
            <p>{users.name}</p>
            <p>{users.surname}</p>
            <p>{users.email}</p>
          </div> 
          <div className="user-following">
            <button className="user-follow" onClick={() => setToggle(!toggle)}>Followers</button>
            <LogoutAndDelete users={users}/>
          </div>
        </div>
        <Followers toggle={toggle} setToggle={setToggle}/>
        <Link to='/editprofile'>Update account</Link>
      </div>
      <div className="posts-and-comments">
        <p onClick={() => {setPostLink(true); setCommentLink(false); setLikeLink(false);}} className={`user-links ${postLink ? 'active' : ''}`}>Posts</p>
        <p onClick={() => {setPostLink(false); setCommentLink(true); setLikeLink(false);}} className={`user-links ${commentLink ? 'active' : ''}`}>Comments</p>
        <p onClick={() => {setPostLink(false); setCommentLink(false); setLikeLink(true);}} className={`user-links ${likeLink ? 'active' : ''}`}>Likes</p>
      </div>
        <div className='home-posts'>
          { postLink && !commentLink && !likeLink ? <UserPosts loading={loading} posts={posts} id={id}/> :
            commentLink && !postLink && !likeLink ? <UserComments loading={loading2} comments={comments} id={id}/> :
            likeLink && !postLink && !commentLink ? <UserLikes id={id} /> : ''}
        </div>
    </section>
  )
}

export default User