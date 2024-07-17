import React, { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { imgUpload } from './Post'

function UploadPostImage() {
    const [images, setImages] = useState([])

    const uploadImage = async (files) => {
        // console.log(files)
        let linkArr = []    
        try{
            for(let i = 0; i < files.length; i++){
                const data = await imgUpload(files[i])
                linkArr.push(data)   
            }           
            console.log(linkArr)
        }catch(err){
            console.log(err)
            toast.error('There was an error uploading the image(s)')
        }
    }
  return (
    <>
        <input type="file" multiple={true} lable="Image" name="myFile" id="file-upload" accept='.jpeg, .png, .jpg' onChange={(e) => {uploadImage(e.target.files)}}/>      
    </>
  )
}

export default UploadPostImage