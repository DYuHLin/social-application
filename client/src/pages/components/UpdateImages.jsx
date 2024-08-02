import React from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

function UpdateImages({images, setImages, id}) {
    const removeImg = (image) => {
        try{
            axios.put(`http://localhost:3000/api/posts/${id}/deleteimg`, {imgUrl: image}, {headers: {'Content-Type': 'Application/json'}})
            console.log('removed')
        }catch(err){
            console.log(err)
            toast.error('There was an error removing this image.')
        }
    }
    const addImg = (image) => {

    }

  return (
    <div className='image-list'>
        <ul className='images-list'>
            {images.map((img, key) => {
                return(
                    <li className='image-in-list' key={key}>
                        <img src={img} alt="uploaded image" className='update-img'/>
                        <button onClick={() => removeImg(img)}>Remove</button>
                    </li>
                )
            })}
        </ul>
        <button>New Image</button>
    </div>
  )
}

export default UpdateImages