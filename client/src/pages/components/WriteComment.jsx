import React from 'react'

function WriteComment({postId, userId}) {
  return (
    <div className='write-comment'>
        <form method="POST">
            <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
            <button>Send</button>
        </form>
    </div>
  )
}

export default WriteComment