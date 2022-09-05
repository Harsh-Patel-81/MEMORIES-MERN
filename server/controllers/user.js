import bcrypt from 'bcryptjs';// to encrypt password and increase security
import jwt from 'jsonwebtoken';// to store user into web browser etle ke uer jo site bandh kari de to pan tene signed in rakhvama helpfull chhe

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password} = req.body;//assigning data from req.body whichi is coming in post request

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message : "user don't exist, see you inputs"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);// .compare(kone, koni sathe);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials."});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test' ,{expiresIn:'1h'});
        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message : 'Something went wrong'});// undefine server error 
    }
}

//console.log("in controllers/user.js");

export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName,  lastName} = req.body;
    // console.log(email);
    // console.log(password);
    // console.log(confirmPassword);
    // console.log(firstName);
    // console.log(lastName);

    try {
        const existingUser = await User.findOne({email});
        //console.log(existingUser);

        if(existingUser) return res.status(400).json({message : "user already exists"});

        if(password !== confirmPassword) return res.status(400).json({message : "Passwords don't match"});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({email, password : hashedPassword, name : `${firstName} ${lastName}` });

        const token = jwt.sign({email: result.email, id: result._id}, 'test' ,{expiresIn:'1h'}); // revise and try to unnderstand

        res.status(200).json({result, token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Something went wrong'});
    }
} 
