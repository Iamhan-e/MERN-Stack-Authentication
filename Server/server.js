import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDb from './config/mongodb.js'
import authRouter from './routes/authRouter.js'

const app= express()
const port= process.env.PORT || 3000;

connectDb(); 

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));

//API ENDPOINTS
app.get('/', (req, res)=>{
    res.send("API working fine!!")
})

app.use('/api/auth', authRouter)

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})