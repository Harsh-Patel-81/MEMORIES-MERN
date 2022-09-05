import { AUTH, LOGOUT , ERROR} from "../constants/actionTypes";

const authReducers =(state={ authData : null,statusErrMsg:[]}, action)=>{
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return {...state, authData: action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        case ERROR:
            //console.log(action.payload);
            //console.log(typeof action.payload);
            return {...state,  statusErrMsg: action?.payload};
        default:
           return state;
    }
};
export default authReducers;

