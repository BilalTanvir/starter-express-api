const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) =>{

    const {reqUsername, reqEmail, reqPassword} = req.body;
    try {

        const existingUser = await userModel.findOne({ email : reqEmail});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(reqPassword, 10);

        const result = await userModel.create({
            email: reqEmail,
            password: hashedPassword,
            username: reqUsername
        });

        const token = jwt.sign({email : result.email, id : result._id }, SECRET_KEY);
        res.status(201).json({user: result, token: token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

const signin = async (req, res)=>{
    
    const {reqEmail, reqPassword} = req.body;

    try {
        
        const existingUser = await userModel.findOne({ email : reqEmail});
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }

        const matchPassword = await bcrypt.compare(reqPassword, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id }, SECRET_KEY);
        res.status(200).json({user: existingUser, token: token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

module.exports = { signup, signin };