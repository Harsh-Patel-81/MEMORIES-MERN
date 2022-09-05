
import * as api from '../api';
import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, UPDATE, FETCH_POST , COMMENT, ERROR } from '../constants/actionTypes';

//Actions Creators

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type : START_LOADING});

        const {data } = await api.fetchPost(id);
        //console.log(data);
        
        dispatch({ type : FETCH_POST, payload : data})

        dispatch({ type : END_LOADING});
    } catch (error) {
        const errMsg =error.response && error.response.data.message ? error.response.data.message : error.message;
        const statusCode=error.response.status;
        dispatch({type : ERROR, payload: [statusCode, errMsg]});
        console.log(error);
    }
}

export const getPosts=(page)=> async (dispatch)=>{
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchPosts(page);// {data} is object distructuring karyu kevay aa na karo to tamne aakho object male but aapde to ey object no data vadi key-pair jove chhe.
        //console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({type : END_LOADING});
    } catch (error) {
        const errMsg =error.response && error.response.data.message ? error.response.data.message : error.message;
        const statusCode=error.response.status;
        dispatch({type : ERROR, payload: [statusCode, errMsg]});
        console.log(error);
    }
}
export const getPostsBySearch = (searchQuery) => async (dispatch)=>{
    try {
        dispatch({type: START_LOADING});
        const { data : {data}} = await api.fetchPostsBySearch(searchQuery);
        //console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({type : END_LOADING});
    } catch (error) {
        const errMsg =error.response && error.response.data.message ? error.response.data.message : error.message;
        const statusCode=error.response.status;
        dispatch({type : ERROR, payload: [statusCode, errMsg]});
        console.log(error);
    }
}


export const createPost =(post, navigate)=>async (dispatch)=>{
    try {
        dispatch({type: START_LOADING});
       const {data}=await api.createPost(post);

       navigate(`/posts/${data._id}`);

       dispatch({
        type:CREATE,
        payload:data
       });

    } catch (error) {
        const errMsg =error.response && error.response.data.message ? error.response.data.message : error.message;
        const statusCode=error.response.status;
        dispatch({type : ERROR, payload: [statusCode, errMsg]});
        console.log(error);
    }
}

export const updatePost=(id,post)=>async(dispatch)=>{
    try {
        const {data}=await api.updatePost(id,post);

        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        const errMsg =error.response && error.response.data.message ? error.response.data.message : error.message;
        const statusCode=error.response.status;
        dispatch({type : ERROR, payload: [statusCode, errMsg]});
        console.log(error);
        
    }
}

export const deletePost = (id) => async (dispatch) =>{
    try {
        await api.deletePost(id);
        dispatch({type: DELETE,payload:id});
    } catch (error) {
        const errMsg =error.response && error.response.data.message ? error.response.data.message : error.message;
        const statusCode=error.response.status;
        dispatch({type : ERROR, payload: [statusCode, errMsg]});
        console.log(error);
    }
}

export const likePost= (id) => async (dispatch) =>{
    try {
        const {data}= await api.likePost(id);

        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        const errMsg =error.response && error.response.data.message ? error.response.data.message : error.message;
        const statusCode=error.response.status;
        dispatch({type : ERROR, payload: [statusCode, errMsg]});
        console.log(error);
        
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
       const {data} = await api.comment(value, id);

       //console.log(data); 
       dispatch({type: COMMENT, payload: data});

       return data.comments;
    } catch (error) {
        console.log(error);
    }
}