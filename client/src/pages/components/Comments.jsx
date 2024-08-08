import React, { useEffect, useState } from 'react'
import WriteComment from './WriteComment'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LikeButtonComment from './LikeButtonComment'

function Comments({postId, userId}) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:3000/api/comment/${postId}`, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        setComments(res.data)
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching the comments')
      })
  },[comments])

  return (
    <div className="post-container">
      <WriteComment postId={postId} userId={userId}/>
      {
      loading && comments.length === 0 ? <p>Loading the posts...</p> :
      comments.length === 0 ? <p>There are no posts right now</p>:
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
            <Link to={`/${comment._id}`}>Comments</Link>
          </div>
        </div>
        )
      })
      }  
    </div>
  )
}

export default Comments