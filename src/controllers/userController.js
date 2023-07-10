const userModel = require("../models/user");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESKEY"


const signup = async (req, res) => {
    
    console.log(req.body);

    const { reqUsername, reqEmail, reqPassword} = req.body;

    try {
        const existingUser = await userModel.findOne({ email: reqEmail });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        const hashedPwd = await brcypt.hash(reqPassword, 10)
        const result = await userModel.create({
            email: reqEmail,
            password: hashedPwd,
            username: reqUsername

        });


        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, SECRET_KEY);
        res.status(201).json({ user: result, token: token });


    } catch (error) {

        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const signin = async (req, res) => {
    const { reqEmail, reqPassword } = req.body;
    
    try {
        const existUser = await userModel.findOne({ email: reqEmail });
        if (!existUser) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const matchPwd = await brcypt.compare(reqPassword,existUser.password);

        if(!matchPwd){
            return res.status(404).json({message: "Invalid Crendentials"});
        }

        const genToken = jwt.sign({
             email: existUser.email,
             id: existUser._id
        },SECRET_KEY);

        res.status(201).json({
            user: existUser,
            token: genToken
        })
    

    } catch (error) {

        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = { signup, signin };