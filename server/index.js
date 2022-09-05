import express from 'express';
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRouter from './routes/posts.js'
import userRoutes from './routes/users.js'

const app=express();
dotenv.config();


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',postRouter);
app.use('/user',userRoutes);

//%40 for @ in encoded version
//const CONNECTION_URL = 'mongodb+srv://harshpatel:harshpatel4446@cluster0.4myqc.mongodb.net/?retryWrites=true&w=majority';
const PORT= process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=> app.listen(PORT,()=>console.log(`Server Running at port:${PORT}`)))
.catch((error)=>console.log(error.message));

//mongoose.set('useFindAndModify',false);

