import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import LikeButton from './components/LikeButton'

function Home() {
  const {user, setUser} = useContext(AppContext)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts/', {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the posts')
      })
  },[posts])

  return (
    <section>
    <h1>Home</h1>
    <Link to='/post'>Create Post</Link>
      {
        loading && posts.length === 0 ? <p>Loading the posts...</p> :
        posts.length === 0 ? <p>There are no posts right now</p>:
        posts.map((post, key) => {
          return(
          <div className="post-container" key={key}>
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
              <LikeButton postId = {post._id}/>
              <Link>Comments</Link>
            </div>
          </div>
          )
        })
      } 
    </section>
  )
}

export default Home