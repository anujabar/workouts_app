import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})
// static signup method
userSchema.statics.signup=async function(email,password){
    if(!email || !password){
        throw Error("All fields are required")
    }
    const exists=await this.findOne({email})
    if(exists){
        throw Error("This email already exists")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }

    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    const data={
        email:email,
        password:hash
    }
    const user= await this.create(data)
    return user
}

// static login method
userSchema.statics.login=async function (email,password){
    if(!email || !password){
        throw Error("All fields are required")
    }
    const user= await this.findOne({email})
    if(!user){
        throw Error("Invalid Email")
    }

    const match=await bcrypt.compare(password,user.password)

    if(!match){
        throw Error("Invalid Password")
    }
    return user
}

export const User=mongoose.model("user",userSchema) //User is the model, user is the collection in the db, an instance of the model is a document in the collection, based on the schema