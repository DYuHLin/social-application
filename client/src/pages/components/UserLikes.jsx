import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import axios from 'axios'

function UserLikes({id}) {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
    axios.get(`http://localhost:3000/api/posts/user/likes/${id}`, {headers:{'content-type': 'application/json'}})
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this users posts')
      })
  },[])

  return (
    <>
    {
        loading && posts.length === 0 ? <p>Loading the likes...</p> :
        posts.length === 0 ? <p>This user has no likes</p>:
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
              <LikeButton postId = {post._id}/>
              <Link to={`/${post._id}`}>Comments</Link>
            </div>
          </div>
          )
        })
      } 
    </>
  )
}

export default UserLikes