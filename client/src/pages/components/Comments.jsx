import React from 'react'
import WriteComment from './WriteComment'

function Comments({postId, userId}) {
  return (
    <div className="post-container">
        <WriteComment postId={postId} userId={userId}/>
    </div>
  )
}

export default Comments