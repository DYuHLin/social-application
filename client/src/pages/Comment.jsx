import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AppContext from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import Comments from './components/Comments'
import LikeButtonComment from './components/LikeButtonComment'

function Comment() {
    let { id } = useParams()
    const [single, setSingle] = useState(false)
    const [comments, setComments] = useState([])
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/comment/${id}/comment`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setSingle(res.data)
          }).catch((err) => {
            console.log(err)
            toast.error('There was an error fetching this post')
          })
      },[single]) 

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
        <h1>Comment</h1>
      {!single ? '' : <div className="post-container">
      <div className="poster-info">
        <h4 className="poster">{single.user.username}</h4>
        <span className="post-date">{new Date(single.date).toLocaleString()}</span>
      </div>
      <div className="post-content">
        {
          single.text.trim() != '' ? <p>{single.text}</p> : ''
        }
        {
          single.link.trim() != '' ? <p>{single.link}</p> : ''
        }
        {
          single.video.trim() != '' ? <p>{single.video}</p> : ''
        }
        {
          single.youtube.trim() != '' ? <div dangerouslySetInnerHTML={{__html: single.youtube}}></div> : ''
        }
        {
        single.pics.length != 0 ? 
        <section className="img-container">
          <div className="slider-wrapper">
            <div className="slider">
              {single.pics.map((pic, id) => {
                return(
                  <img id={`slide-${id}`} src={pic} alt="posts image" key={id}/>
                )
              })}
            </div>
            <div className="slider-nav">
            {single.pics.map((pic, id) => {
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
        <LikeButtonComment commentId={single._id} likes={single.likes}/>
        <div className="comment-count"><p>{comments.filter((com) => {return com.reply == single._id}).length}</p><Link to={`/${single._id}/comment`}>Comments</Link></div>  
      </div>
    </div>}
    <Comments postId={id} userId={decoded.user._id}/>
    </section>
  )
}

export default Comment