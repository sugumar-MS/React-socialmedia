import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Missing from './Missing';

const PostPage = ({posts,handleDelete,handleEdit}) => {
    const {id} = useParams();
    const post = posts.find(post=>(post.id).toString()=== id)
    // console.log(post)
  return (
    <div className='PostPage'>
      {post &&
      <>
      <h2>{post.title}</h2>
      <p>{post.datetime}</p>
      <p>{post.body}</p> 
      <Link to ={`/edit/${post.id}`}><button className='editButton'>Edit</button></Link>
      <button className='deleteButton' onClick={()=>handleDelete(post.id)}>Delete</button>
      </>
      }
      {!post &&
      <>
      <Missing/>
      </>}
    </div>
  )
}

export default PostPage
