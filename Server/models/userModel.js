import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verifyOtp: {type: String, default: ''},
    verifyOtpExpiray: {type: Number, default: 0},
    isAccountValid:{type: Boolean, defalut: false},
    resetOtp: {type: String, default: ''},
    resetOtpExpiry: {type: Number, default: 0},
})

const userModel= mongoose.model.user || mongoose.model('user', userSchema)

export default userModel