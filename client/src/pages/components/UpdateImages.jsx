import React from 'react'

function UpdateImages({images}) {
    const removeImg = (image) => {
        
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
                        <button>Remove</button>
                    </li>
                )
            })}
        </ul>
        <button>New Image</button>
    </div>
  )
}

export default UpdateImages