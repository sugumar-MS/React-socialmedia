import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Nav from './components/Nav'
import Home from './components/Home'
import NewPost from './components/NewPost'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import PostPage from './components/PostPage'
import Missing from './components/Missing'
import Footer from './components/Footer'
import api from './api/posts'
import EditPost from './components/EditPost'
import About from './components/About'
import useWindowSize from './hooks/useWindowSize'

const App = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [posts, setPosts] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {width,height} = useWindowSize();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/users');
        setPosts(res.data);
      } catch (err) {
        if (err.res) {
          console.log(err.res.data)
          console.log(err.res.status)
          console.log(err.res.headers)
        } else {
          console.log(`Error:${err.message}`);
          setFetchError(err.message)
        }
      }finally{
        setIsLoading(false)
      }
    }
    fetchPosts();
  }, [])

  useEffect(() => {
    const filterResult = posts.filter(post =>
      ((post.title).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.body).toLowerCase()).includes(search.toLowerCase())
    )
    setSearchResult(filterResult.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const addNewPost = { id, title: postTitle, datetime, body: postBody }
    try{
      const res = await api.post('/users',addNewPost)
    const allPost = [...posts, res.data]
    setPosts(allPost)
    setPostTitle('')
    setPostBody('')
    navigate('/')
    }catch(err){
      console.log(`Error:${err.message}`);
    }
  }

  const handleDelete = async(id) => {

    try{
      await api.delete(`/users/${id}`)
    const filterResult = posts.filter(post => post.id !== id)
    setPosts(filterResult)
    navigate('/')
    }catch(err){
    console.log(`Error:${err.message}`);
    }
  }


  const handleEdit =async(id)=>{
    
    const datetime = format (new Date(), 'MMMM dd, yyyy pp')
    const updatePost = {id, title:editTitle, datetime, body: editBody}
    try{
      const res= await api.put(`/users/${id}`,updatePost)
      setPosts(posts.map(post=>post.id===id? {...res.data}:post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    }catch(err){
      console.log(`Error:${err.message}`);
      
    }

  }

  return (
    <div className='App' >
      <Header tittle="Social_Media-App" width={width} />
      <Nav
        search={search}
        setSearch={setSearch} />
<div className='Home'>
{isLoading && <p style={{textAlign:'center'}}>Loading Posts..</p>}
{fetchError && <p style={{textAlign:'center'}}>{`Error: ${fetchError}`}</p>}

{!isLoading && !fetchError &&(
      <Routes>
         <Route path='/' element={
          <Home
          posts={searchResult} />}
           />
        <Route path='post'>
          <Route index element={<NewPost
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />} />
          <Route path=':id' element={<PostPage
           posts={posts}
           
           handleDelete={handleDelete} />} />
        </Route>
        <Route path='/edit/:id' element={<EditPost
        
        posts={posts}
        handleEdit={handleEdit}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editBody={editBody}
        setEditBody={setEditBody}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="*" element={<Missing />} />
      </Routes>
    )}
    </div>
      <Footer />
    </div>
  )
}

export default App
