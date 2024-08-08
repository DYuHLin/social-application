import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LikeButtonComment from './LikeButtonComment'
import DeleteComment from './EditDelete/DeleteComment'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import AppContext from '../../context/AppContext'

function UserComments({comments, loading, id}) {
  const [toggle, setToggle] = useState(false)
  const [comment, setComment] = useState(false)
  const [commentsC, setCommentsC] = useState([])
  const [ids, setId] = useState(false)
  const {user} = useContext(AppContext)
  const decoded = jwtDecode(user)

  const togglePopup = (id) => {
    setToggle(!toggle)
    axios.get(`http://localhost:3000/api/comment/${id}/comment`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setComment(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this post')
      })
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/api/comment/comments`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setCommentsC(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the comments')
      })
  },[commentsC])

  return (
    <div className="post-container">
      {
      loading && comments.length === 0 ? <p>Loading the posts...</p> :
      comments.length === 0 ? <p>There are no comments right now</p>:
      comments.map((comment, key) => {
        return(
        <div className="comment-container" key={key}>
          <div className="poster-info">
            <h4 className="poster">{comment.user.username}</h4>
            <span className="post-date">{new Date(comment.date).toLocaleString()}</span>
          </div>
          <div className="post-content">
            {
              comment.text.trim() != '' ? <p>{comment.text}</p> : ''
            }
            {
              comment.link.trim() != '' ? <p>{comment.link}</p> : ''
            }
            {
              comment.video.trim() != '' ? <p>{comment.video}</p> : ''
            }
            {
              comment.pics.length != 0 ? 
              <section className="img-container">
                <div className="slider-wrapper">
                  <div className="slider">
                    {comment.pics.map((pic, id) => {
                      return(
                        <img id={`slide-${id}`} src={pic} alt="posts image" key={id}/>
                      )
                    })}
                  </div>
                  <div className="slider-nav">
                  {comment.pics.map((pic, id) => {
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
            <LikeButtonComment commentId={comment._id} likes={comment.likes}/>
            <div className="comment-count"><p>{commentsC.filter((com) => {return com.reply == comment._id}).length}</p><Link to={`/${comment._id}`}>Comments</Link></div>      
            {decoded.user._id == comment.user._id ? <button onClick={() => togglePopup(comment._id)}>Delete</button> : ''}
            {decoded.user._id == comment.user._id ? <Link to={`/${comment._id}/updatecomment`}>Update</Link> : ''}
          </div>
        </div>
        )
      })
      }  
      <DeleteComment toggle={toggle} setToggle={setToggle} comment={comment} /> 
    </div>
  )
}

export default UserComments