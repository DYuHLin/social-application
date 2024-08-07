import React from 'react'

function SearchContainer({posts, comments, users, search}) {
  return (
    <div className="searchContainer">
        {posts === false ? '' : posts.length == 0 ? '' : posts.filter((item) => {
            return search.toLocaleLowerCase() === '' ? '' : item.text.toLocaleLowerCase().includes(search) || item.user.username.toLocaleLowerCase().includes(search)||
            item.link.toLocaleLowerCase().includes(search) || item.video.toLocaleLowerCase().includes(search);
            }).map((post, id) => {
            return(
            <div className="searchBox" key={id}>
                <p>{post.user.username}</p>
                {
                    post.text.trim() != '' ? <p>{post.text}</p> : ''
                }
                {
                    post.pics.length == 0 ? '' :<p>{post.pics.length} images</p>
                }
                {
                    post.link.trim() != '' ? <a>{post.link}</a> : ''
                }
                {
                    post.video.trim() != '' ? <video>{post.video}</video> : ''
                } 
            </div> 
            )
        }) 
        } 
        {comments === false ? '' : comments.length == 0 ? '' : comments.filter((item) => {
            return search.toLocaleLowerCase() === '' ? '' : item.text.toLocaleLowerCase().includes(search) || item.user.username.toLocaleLowerCase().includes(search)||
            item.link.toLocaleLowerCase().includes(search) || item.video.toLocaleLowerCase().includes(search);
            }).map((com, id) => {
            return(
            <div className="searchBox" key={id}>
                <p>{com.user.username}</p>
                {
                    com.text.trim() != '' ? <p>{com.text}</p> : ''
                }
                {
                    com.pics.length == 0 ? '' :<p>{com.pics.length} images</p>
                }
                {
                    com.link.trim() != '' ? <a>{com.link}</a> : ''
                }
                {
                    com.video.trim() != '' ? <video>{com.video}</video> : ''
                } 
            </div> 
            )
        }) 
        } 
        {users === false ? '' : users.length == 0 ? '' : users.filter((item) => {
            return search.toLocaleLowerCase() === '' ? '' : item.username.toLocaleLowerCase().includes(search)
            }).map((user, id) => {
            return(
            <div className="searchBox" key={id}>
                <p>{user.username}</p>
            </div> 
            )
        }) 
        }
        </div>
  )
}

export default SearchContainer