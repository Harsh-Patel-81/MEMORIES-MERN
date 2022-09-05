import express from 'express';


import {getPostsBySearch,getPosts, getPost ,createPost,updatePost ,deletePost ,likePost, commentPost} from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router();

//http://localhost:5000/posts
router.get('/search',getPostsBySearch);//routes nu arrangement pan perfect hou joiye nai to error aave chhe
router.get('/',getPosts);
router.get('/:id', getPost);
router.post('/',auth,createPost);
router.patch('/:id',auth, updatePost);// patch() is used for updating existing data,file or any kind of documents
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.post('/:id/commentPost',auth, commentPost);


export default router;