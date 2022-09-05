import React,{useState,useEffect} from 'react'
import useStyles from './styles'
import {TextField,Button,Typography,Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';
import { createPost,updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';


const Form = ({currentId,setCurrentId}) => {
  const [postData,setPostData]=useState({ title:'', message:'', tags:'', selectedFile:''});
  const post =useSelector((state)=>currentId? state.posts.posts.find((p)=>p._id===currentId):null);
  const classes=useStyles();
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(()=>{
    if(post)setPostData(post);
  },[post])

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId,{...postData, name : user?.result?.name}));
    }else{
      dispatch(createPost({...postData, name : user?.result?.name}, navigate));
    }
    clear();
  }

  const clear=()=>{
      setCurrentId(null)
      setPostData({title:'',message:'',tags:'',selectedFile:''})
  }

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Plese sign in to create your own posts and likes other's posts
        </Typography>
      </Paper>

    )
  }

// paper is container with white background.
// value stores state of particular field.
// for every function there will be always one even call back function with parameter e.
  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off'  className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId?`Editing ${post.title}`:'Creating a Memory'}</Typography>
       
        <TextField required name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}/>
        <TextField required name='message' variant='outlined' label='Message' fullWidth multiline rows={4} value={postData.message} onChange={(e)=>setPostData({...postData,message:e.target.value})}/>
        <TextField required name='tags' variant='outlined' placeholder='eg: tag1,tag2,tag3 etc' label='Tags' fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}/>
        <div className={classes.fileInput}>
          <FileBase  type='file' mulitple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
        </div>
        <Button  className={`${classes.buttonSubmit}`} variant='contained' color='primary' size='large' fullWidth type='Submit'>Submit</Button><br/>
        <Button   variant='contained' color='secondary' size='small' fullWidth onClick={clear}>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form