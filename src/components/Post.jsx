import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    <div className='Post'>
      <Link to={`post/${post.id}`}><h2>{post.title}</h2></Link>
      <p className='postTime'>{post.datetime}</p>
      <p className='postBody'>{(post.body).length <=25 ? post.body : `${(post.body).slice(0,25)}...`}</p>
    </div>
  )
}

export default Post
