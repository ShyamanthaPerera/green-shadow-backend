import express from "express";
import {User} from "../models/dtos/User";
import {registerUser, verifyUser} from "../database/userDataStore";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post('/login',async (req ,res) => {
    const user: User = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        password: req.body.password
    }

    try{
        const isVerified = await verifyUser(user);
        if(isVerified){
            const access_token = jwt.sign(
                {userEmail: user.userEmail},
                process.env.SECRET_ACCESS_TOKEN  as string,
                {expiresIn: "1h"}
            );
            res.status(200).json(access_token)
        }else {
            res.status(200).json("Invalid credentials")
        }
    }catch (error){
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

router.post('/register', async (req,res) => {
    const user:User = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        password: req.body.password
    }
    try{
        const newUser = await registerUser(user);
        res.status(200).json(newUser)
    }catch (error){
        res.status(500).send("Internal server error")
    }
})

export default router;