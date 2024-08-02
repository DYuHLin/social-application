import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { imgUpload } from './Post'

function UpdateImages({images, setImages, id}) {
    const [loading, setLoading] = useState(true)
    const [upload, setUpload] = useState(false)

    const removeImg = (image) => {
        try{
            axios.put(`http://localhost:3000/api/posts/${id}/deleteimg`, {imgUrl: image}, {headers: {'Content-Type': 'Application/json'}})
            console.log('removed')
        }catch(err){
            console.log(err)
            toast.error('There was an error removing this image.')
        }
    }
    const addImg = async (files) => {
        setUpload(true)
        let linkArr = []    
        try{
            for(let i = 0; i < files.length; i++){
                const data = await imgUpload(files[i])
                linkArr.push(data)   
            }           
            console.log(linkArr)
            setImages(...images, linkArr)
            setLoading(false)
        }catch(err){
            console.log(err)
            toast.error('There was an error uploading the image(s)')
        }
    }

  return (
    <div className='image-list'>
        <ul className='images-list'>
            {images.length == 0 ? '' : images.map((img, key) => {
                return(
                    <li className='image-in-list' key={key}>
                        <img src={img} alt="uploaded image" className='update-img'/>
                        <button onClick={() => removeImg(img)}>Remove</button>
                    </li>
                )
            })}
        </ul>
        <input type="file" multiple={true} lable="Image" name="myFile" id="file-upload" accept='.jpeg, .png, .jpg' onChange={(e) => {addImg(e.target.files)}}/>
        {upload ? <p>{loading ? 'Uploading...' : 'Completed'}</p> : ''}   
    </div>
  )
}

export default UpdateImages