import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles'
import Post from './Post/Post'

const Posts = ({setCurrentId}) => {

  const {posts, isLoading}=useSelector((state)=>state.posts);// {posts:[]} that's why we are distructuring it to get posts  // in  reducers we define it as state . here state is  global store that we created in index.js and  stores data and varible and behave like container.
  const classes=useStyles();

  //console.log(posts);
  if(!posts.length && !isLoading) return 'No Posts found!';

  return (
    isLoading ? < CircularProgress/> : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}> 
        {posts.map((post)=>(
          <Grid key={post._id} item xs={12} sm={12} ms={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
    
  )
}

export default Posts