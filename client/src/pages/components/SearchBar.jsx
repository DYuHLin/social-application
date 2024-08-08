import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import SearchContainer from './SearchContainer'

function SearchBar() {
    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/posts/', {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the posts')
      })
    },[posts])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/auth/getusers`, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setUsers(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this user')
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
    },[])
  return (
    <div className='searcher'>
        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='searchbar'/>  
        <SearchContainer posts={posts} comments={comments} search={search} users={users} />
    </div>
  )
}

export default SearchBar