import React from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'

function UploadPostImage() {

    const uploadImage = (files) => {
        // console.log(files)
        let linkArr = []
        const formData = new FormData()
        try{
            for(let i = 0; i < files.length; i++){
                formData.append('files', files[i])
                formData.append('upload_preset', 'jag6ma0t')
            }

            axios.post('https://api.cloudinary.com/v1_1/dqdoxrm2x/image/upload', formData, {headers:{'content-type': 'application/json'}}).then((res) => {
                console.log(res)
            })
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