import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const EditPost = ({posts,handleEdit,editTitle,setEditTitle,editBody,setEditBody}) => {

    const {id}=useParams();
    const post = posts.find(post =>(post.id).toString()===id)
    
    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post,setEditTitle,setEditBody])

    if(!post){
      return(
      <>
      <h2>Page Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
      </>
      );
    }
  return (
    <div className='NewPost'>
       
      <h2>Edit Post</h2>
      <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
      <label htmlFor='editTitle'>Title:</label>
      <input
      id='editTitle'
      required
      type='text'
      value={editTitle}
      onChange={(e)=>setEditTitle(e.target.value)}
      />
      <label htmlFor="editBody">post:</label>
      <textarea
      id='editBody'
      type='text'
      value={editBody}
      onChange={(e)=>setEditBody(e.target.value)}/>
      <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
      </form>
    </div>
  )
}

export default EditPost
