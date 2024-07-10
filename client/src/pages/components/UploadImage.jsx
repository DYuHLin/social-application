import React from 'react'
import axios from 'axios'

function UploadImage({setImage}) {

    const UploadImage = (files) => {
      //jag6ma0t
        console.log(files[0])
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', 'jag6ma0t')
        
        axios.post('https://api.cloudinary.com/v1_1/dqdoxrm2x/image/upload', formData).then((res) => {
          console.log(res)
          setImage(res.data.secure_url)
        })
    }

  return (
    <>
    <input type="file" lable="Image" name="myFile" id="file-upload" accept='.jpeg, .png, .jpg' onChange={(e) => {UploadImage(e.target.files)}}/>      
    </>
  )
}

export default UploadImage