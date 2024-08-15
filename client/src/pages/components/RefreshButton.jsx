import React from 'react'

function RefreshButton({setPosts, refresh}) {
    
  return (
    <div className='refresher'>
    <button onClick={() => setPosts(refresh)} className='refresh-btn'>Refresh</button>
    </div>
  )
}

export default RefreshButton