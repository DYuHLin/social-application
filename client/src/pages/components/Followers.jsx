import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import axios from 'axios'

function Followers({toggle, setToggle}) {
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)
    const [followers, setFollowers] = useState([])
    const [hidden, setHidden] = useState('followers')

useEffect(() => {
    axios.get(`http://localhost:3000/api/auth/${decoded.user._id}/followers`, {headers:{'content-type': 'application/json'}})
        .then((res) => {
        setFollowers(res.data)
        }).catch((err) => {
        console.log(err)
        toast.error('There was an error fetching this user')
        })
    },[])

  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            <div className={`popup-content`}>
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <button className='follow-btn' onClick={() => setHidden(hidden === 'followers' ? 'following' : 'followers')}>{hidden == 'followers'? 'Following' : 'Followers'}</button>
                <div className={`popup-fow-container ${hidden == 'following' ? 'hidden' : ''}`}>
                {   decoded.user.followers.length === 0 ? <p>You are not following anyone...</p> :
                    decoded.user.followers.map((fow, key) => {
                        return(
                            <div className={`user-pane-info`} key={key}>
                                <div className="user-detail">
                                <div className="img-round">
                                    <img src={fow.user.image} alt="user's image" className='profile-img'/>
                                </div>   
                                    <p>{fow.user.username}</p>
                                </div>
                                <button className="user-follow">Following</button>
                            </div>
                        )
                    })
                }
                </div>           

                <div className={`popup-fow-container ${hidden == 'followers' ? 'hidden' : ''}`}>
                {followers.length === 0 ? <p>You have no follwers...</p> :
                followers.map((fow, key) => {
                    return(
                        <div className={`user-pane-info`} key={key}>
                            <div className="user-detail">
                            <div className="img-round">
                                <img src={fow.image} alt="user's image" className='profile-img'/>
                            </div>   
                                <p>{fow.username}</p>
                            </div>
                            <button className="user-follow">Follow</button>
                        </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Followers