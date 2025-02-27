import { PrismaClient } from "@prisma/client";
import {User} from "../models/dtos/User";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export async function registerUser(u:User){
    const hashPassword = await bcrypt.hash(u.password, 10);
    try{
        const existingUser = await prisma.user.findUnique({
            where: {userEmail: u.userEmail}
        })

        if(existingUser){
            throw new Error("User already exists");
        }

        const newUser = await prisma.user.create({
            data:{
                userName: u.userName,
                userEmail: u.userEmail,
                password: hashPassword,
            }
        })
        return newUser;
    }catch(err){
        console.log("Error registering user",err);
    }
}

export async function verifyUser(u:User){
    try{
        const user = await prisma.user.findUnique({
            where:{userEmail: u.userEmail}
        });
        if(!user){
            throw new Error("User does not exist");
        }
        const isPasswordValid = await bcrypt.compare(u.password, user.password);
        if(!isPasswordValid){
            throw new Error("Invalid credentials");
        }
        return user
    }catch(err){
        console.log("Error verifying user",err);
    }
}