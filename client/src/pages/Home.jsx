import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import LikeButton from './components/LikeButton'
import Users from './components/Users'
import FilteredResults from './components/FilteredResults'
import { jwtDecode } from 'jwt-decode'
import Posts from './components/Posts'
import CreatePost from './CreatePost'
import { io } from 'socket.io-client'
import RefreshButton from './components/RefreshButton'

const socket = io.connect(`http://localhost:3000`)

function Home() {
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState([])
  const [comments, setComments] = useState([])
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
        setRefresh(res.data)
        setFilteredResults(res.data.filter((post) => decoded.user.followers.some((userId) => userId.user._id === post.user._id)))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the posts')
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

  useEffect(() => {
    socket.off('get_posts').on('get_posts', (data) => {
      setRefresh((content) => [...content, data.post])
    })
  },[socket])

  return (
    <section>
    <h1>Feed</h1>
    <RefreshButton />
    <CreatePost socket={socket} setRefresh={setRefresh}/>
    <div className="see-posts">
      <p onClick={() => {setRegular(true); setFiltered(false)}} className='filter-link'>All</p> <p onClick={() => {setRegular(false); setFiltered(true)}} className='filter-link'>Following</p>
    </div>
    <div className="home-container">
      <div className="home-posts">
      <Posts posts={posts} loading={loading} regular={regular} comments={comments}/>
      <FilteredResults posts={posts} loading={loading} filtered={filtered} filteredResults={filteredResults}/>
      </div>
      <Users />
    </div>
    <button onClick={() => {console.log(`refresh: ${refresh} original: ${posts}`)}}>show</button>
    </section>
  )
}

export default Home