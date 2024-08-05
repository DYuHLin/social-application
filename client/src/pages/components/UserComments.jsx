import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LikeButtonComment from './LikeButtonComment'
import DeleteComment from './EditDelete/DeleteComment'
import axios from 'axios'

function UserComments({comments, loading, id}) {
  const [toggle, setToggle] = useState(false)
  const [comment, setComment] = useState(false)
  const [ids, setId] = useState(false)

  const togglePopup = (id) => {
    setToggle(!toggle)
    setId(id)
    axios.get(`http://localhost:3000/api/comment/${id}/comment`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setComment(res.data)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this post')
      })
  }

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
            <LikeButtonComment commentId={comment._id}/>
            <Link to={`/${comment._id}`}>Comments</Link>
            <button onClick={() => togglePopup(comment._id)}>Delete</button>
            <Link to={`/${comment._id}/updatecomment`}>Update</Link>
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