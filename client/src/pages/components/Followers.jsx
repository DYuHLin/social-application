import React from 'react'

function Followers({toggle, setToggle}) {
  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            <div className="popup-content">
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <h1>Following</h1>
                <p>adwwwwwwwwwwwwwwwwwwwwwwwwvavw</p>
            </div>
        </div>
    </div>
  )
}

export default Followers