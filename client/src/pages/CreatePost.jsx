import React from 'react'
import UploadPostImage from './components/UploadPostImage'

function CreatePost() {

  const handleSumbmit = (e) => {
    e.preventDefault()
    const post = {}
  }

  return (
    <section>
        <h1>Post</h1>
        <form method="POST">
          <textarea name="" id="" cols="30" placeholder='Write your post'></textarea>
          <UploadPostImage />
          <button>Post</button>
        </form>
    </section>
  )
}

export default CreatePost