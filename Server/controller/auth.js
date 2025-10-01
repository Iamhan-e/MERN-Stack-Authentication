import userModel from "../models/userModel"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const registerUser = async (req, res)=>{

    if(!name || !email || !password ){
        return res.json({success: false, message: 'required fields missing'})
    }

    

    try {
        const existingUser= await userModel.findOne({email})

        if (existingUser){
            return res.json({success: false, message: 'User already exists'})
    
        }
        const hashedPassword= await bcrypt.hash(password, 10)
        const user= new userModel({name, email, password: hashedPassword})
        await user.save()

        const token= jwt.sign({id: user._id}, process.env.SECRETKEY, {expiresIn: '7d'})

        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 ,
        })

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
    
    


}