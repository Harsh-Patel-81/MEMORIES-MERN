import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import {ToastContainer, toast,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux';

// Grow is for animations.
const App = () => {
  const auth=useSelector((state) => state.auth);// state ={posts,auth} from reducers/index.js
  const statusCode=auth.statusErrMsg[0];
  const errMsg =auth.statusErrMsg[1];
 // console.log(statusCode);
  //console.log(errMsg);
  //const posts=useSelector((state)=>state.posts);
  //const postStatusCode=posts?.statusErrMsg[0];
  //const postErrMsg=posts?.statusErrMsg[1];
  //console.log(typeof postStatusCode);
  //console.log(postErrMsg);
  const user= JSON.parse(localStorage.getItem('profile'));

  if(statusCode === 400 || statusCode === 404 ){
    toast.info(errMsg);
   }else if(statusCode===500){
   toast.error(errMsg);
  }
  // if(postErrMsg){
  //   toast.error(postErrMsg);
  // }
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Routes>
          <Route path="/" exact element={(<Navigate to='/posts' />)} />
          <Route path="/posts" exact element={<Home/>} />
          <Route path="/posts/search" exact element={<Home/>} />
          <Route path="/posts/:id"  element={<PostDetails/>} />
          <Route path="/auth" exact element={!user ? <Auth/> : <Navigate to='/posts' /> } />
        </Routes>

      </Container>
      {(auth.statusErrMsg && statusCode && errMsg) && (<ToastContainer draggable={false} transition={Zoom} theme='dark' autoClose={4000} position='top-center' />)}
      {/* {(posts.statusErrMsg && postStatusCode && postErrMsg) && (<ToastContainer draggable={false} transition={Zoom} theme='dark' autoClose={4000} position='top-center' />)} */}
    </BrowserRouter>


  )
}
// i have made change in line 17 from video at time: 5:05
export default App;