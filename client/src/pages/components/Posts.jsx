import LikeButton from './LikeButton'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AppContext from '../../context/AppContext'
import { jwtDecode } from 'jwt-decode'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom'

function Posts({posts, loading, regular}) {
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)

  return (
    <>
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
              <LikeButton postId = {post._id} post={post}/>
              <Link to={`/${post._id}`}>Comments</Link>
            </div>
          </div>
          )
        })
      } 
    </>
  )
}

export default Posts