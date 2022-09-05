import { COMMENT, CREATE, DELETE, END_LOADING, ERROR, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, UPDATE } from "../constants/actionTypes";

export default (state={isLoading: true, posts: [],statusErrMsg:[]},action)=>{
    //console.log(action.type);
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading : true};
        case END_LOADING:
            return {...state, isLoading : false};
        case DELETE:
            console.log("deleting, reducers/posts")
            return {...state,posts: state.posts.filter((post)=>post._id!==action.payload)};// here action.payload is id of post we want to delete.
        case UPDATE:
            console.log('updating');
            return {...state, posts: state.posts.map((post)=> post._id===action.payload._id?action.payload:post)}; // action.payload ey updated post chhe etle simply meaning ey thay ke jyare updated post ni id posts ma rahel id ne match thay to updated post return karo nai to original post.
        case COMMENT:
            console.log("getting post with comments");
            return {
                ...state,
                posts: state.posts.map((post) =>{
                    // returning all other posts normally..
                    // change a post just recieve  a comment...
                    if(post._id === action.payload._id) return action.payload;
                    return post;
                } )
            }
        case FETCH_BY_SEARCH:
            console.log('fetching by search');
            return {...state,posts: action.payload };
        case FETCH_POST:
            return {...state, post: action.payload};
        case FETCH_ALL:
            console.log('fetching all posts');
            //console.log(action.payload);
            // jyare pan state(object) sathe work karta hoy tyare pela tene spread karvani always
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case CREATE:
            console.log('creating new post');
            return {...state,posts:[...state.posts,action.payload]};
        case ERROR:
            return {...state,  statusErrMsg: action?.payload};
        default:
            return state;
    }
}
// data fetch karvano hoy ke send karvano hoy ey action na payload ma hoy chhe