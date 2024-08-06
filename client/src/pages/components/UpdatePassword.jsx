import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function UpdatePassword({toggle, setToggle}) {
    const {user} = useContext(AppContext)
    const decoded = jwtDecode(user)
    const [current, setCurrent] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const credentials = {username: decoded.user.username, password: current, newPassword: password, confirmedPassword: confirm }
            axios.put(`http://localhost:3000/api/auth/${decoded.user._id}/updatepassword`, credentials, {headers: {'Content-Type': 'Application/json'}})
                .then((res) => {
                    if(res.data === 'password'){
                        toast.error('You typed the incorrect current password')
                    }else if(res.data === 'match'){
                        toast.error('your new password does not match')
                    } else{
                        toast.success('You have successfully changed your password')
                    }
                })
        }catch(err){
            toast.error('There was an error updating your password')
            console.log(err)
        }
    }

  return (
    <div className={`popup ${toggle ? 'active' : ''}`}>
        <div className="overlay">
            {comment === false ? '' :<div className={`popup-content`}>
                <div className="close-btn" onClick={() => setToggle(!toggle)}>&times;</div>
                <h1>Update Password</h1>
                <div className={`popup-fow-container`}>
                  <form method="PUT">
                  <input type="password" required name='current' id='currentPassword' className='currentPassword' placeholder='CurrentPassword' minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <input type="password" required name='password' id='password' className='password' placeholder='Password' minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <input type="password" required name='confirmedPassword' id='confirmedPassword' className='confirmedPassword' placeholder='Confirm password' value={confirm} onChange={(e) => setConfirm(e.target.value)} minLength={6}/>
                  </form>
                </div>
                <button>Update</button>
            </div>}
        </div>
    </div>
  )
}

export default UpdatePassword