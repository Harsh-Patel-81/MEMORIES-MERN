import * as api from '../api';
import { AUTH , ERROR} from '../constants/actionTypes';



export const signin = (formData,navigate) => async (dispatch) => {
    
    try {
        // log in of user
        const { data } = await api.signIn(formData);
        //console.log(data);

        dispatch({type : AUTH, data});

        navigate('/');
    } catch (error) {
        const errMsg =error.response && error.response.data.message ? error.response.data.message : error.message;
        const statusCode=error.response.status;
        //console.log(typeof errMsg);
        //console.log(errMsg);
        //console.log(error.response.status);
        dispatch({type : ERROR, payload: [statusCode, errMsg]});

        console.log(error);
    }
}

export const signup =(formData, navigate) => async (dispatch) => {
    try {
        // sign up of user
        const { data } = await api.signUp(formData);
        //console.log(data);
        dispatch({type : AUTH, data});

        navigate('/');
    } catch (error) {
        const errMsg =error.response && error.response.data.message ? error.response.data.message : error.message;
        const statusCode=error.response.status;
        //console.log(typeof errMsg);
        //console.log(errMsg);
        //console.log(error.response.status);
        dispatch({type : ERROR, payload: [statusCode, errMsg]});
        console.log(error);
    }
}