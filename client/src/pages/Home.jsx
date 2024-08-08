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
      <Posts posts={posts} loading={loading} regular={regular}/>
      <FilteredResults posts={posts} loading={loading} filtered={filtered} filteredResults={filteredResults}/>
      </div>
      <Users />
    </div>
    </section>
  )
}

export default Home