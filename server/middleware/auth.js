// to do actions like posting new post, update, delete for signed in user. middleware is helpful in this

// any kind of action happens before something
// ex. want to like post  
// click like button => auth middleware (NEXT) => call likeCount controller
import jwt from 'jsonwebtoken';

const auth = async (req,res,next) => {
    try {
        const  token = req.headers.authorization.split(" ")[1];//know more about it
        // token.length > 500 then it is google signin token otherwise customized token

        let decodedData = jwt.verify(token,'test');

        req.userId=decodedData?.id;

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;
