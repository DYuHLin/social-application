import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import LikeButton from './components/LikeButton'
import Users from './components/Users'
import FilteredResults from './components/FilteredResults'
import { jwtDecode } from 'jwt-decode'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [regular, setRegular] = useState(true)
  const [filtered, setFiltered] = useState(false)
  const [filteredResults, setFilteredResults] = useState([])
  const {user, setUser} = useContext(AppContext)
  const decoded = jwtDecode(user)

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts/', {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPosts(res.data)
        setFilteredResults(res.data.filter((post) => decoded.user.followers.some((userId) => userId.user._id === post.user._id)))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the posts')
      })
  },[posts])

  return (
    <section>
    <h1>Your Feed</h1>
    <Link to='/post'>Create Post</Link>
    <div className="see-posts">
      <p onClick={() => {setRegular(true); setFiltered(false)}}>All</p> <p onClick={() => {setRegular(false); setFiltered(true)}}>Following</p>
    </div>
    <div className="home-container">
      <div className="home-posts">
      {
        loading && posts.length === 0 ? <p>Loading the posts...</p> :
        posts.length === 0 ? <p>There are no posts right now</p>:
        posts.map((post, key) => {
          return(
          <div className={`post-container ${!regular ? 'hidden' : ''}`} key={key}>
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
              <LikeButton postId = {post._id}/>
              <Link to={`/${post._id}`}>Comments</Link>
            </div>
          </div>
          )
        })
      } 
      <FilteredResults posts={posts} loading={loading} filtered={filtered} filteredResults={filteredResults}/>
      </div>
      <Users />
    </div>
    <button onClick={() => console.log(posts)}>show</button>
    </section>
  )
}

export default Home