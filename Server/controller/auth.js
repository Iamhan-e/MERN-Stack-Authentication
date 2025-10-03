import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req, res)=>{
    const {username, email, password}= req.body;

    if(!username || !email || !password ){
        return res.json({success: false, message: 'required fields missing'})
    }

    

    try {
        const existingUser= await userModel.findOne({email})

        if (existingUser){
            return res.json({success: false, message: 'User already exists'})
    
        }
        const hashedPassword= await bcrypt.hash(password, 10)
        const user= new userModel({username, email, password: hashedPassword})
        await user.save()

        const token= jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: '7d'})

        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 ,
        })

         return res.json({success:true, message: 'User has successfully registered'})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
    
}

export const login= async(req, res) =>{

    
    const {email, password}= req.body

    if(!email || !password){
          return res.json({success: false, message: 'required field missing'})
    }
    try{
        const user= await userModel.findOne({email})

        if(!user){
            return res.json({success: false, message: 'Email doesnt exist'})
        }

        const isMatch= await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success: false, message: 'Incorrect password'})
        }


        const token= jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: '7d'})

            res.cookie('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 ,
            })
        
        return res.json({success:true, message: 'User has successfully logged in'})

    }catch (error) {
        return res.json({success: false, message: error.message})
    }

}

export const logout= (req, res)=>{
    try {

        res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 ,
            })
        return res.json({success:true, message: 'User has successfully logged out'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}