import {Log} from "../models/dtos/Log";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addLog(l:Log){
    try{
        const newLog = await prisma.log.create({
            data:{
                logName: l.logName,
                logDate: l.logDate,
                logImage: l.logImage,
                fieldName: l.fieldName,
                cropName: l.cropName,
                staffMember: l.staffMember,
                isDeleted: false
            }
        })
        console.log("Log added", newLog);
        return newLog;
    }catch (err){
        console.log("Error adding log",err);
    }
}

export async function updateLog(logName:string,l:Log){
    try{
        const existingLog = await prisma.log.findUnique({
            where:{logName: logName,isDeleted: false}
        });

        if(!existingLog){
            console.log("Log not found");
            return null;
        }

        const updatedLog = await prisma.log.update({
            where: {logName: logName, isDeleted: false},
            data: {
                logName: l.logName || existingLog.logName,
                logDate: l.logDate || existingLog.logDate,
                logImage: l.logImage || existingLog.logImage,
                fieldName: l.fieldName || existingLog.fieldName,
                cropName: l.cropName || existingLog.cropName,
                staffMember: l.staffMember || existingLog.staffMember
            },
        })
        console.log("Log updated", updatedLog);
        return updatedLog;
    }catch (err){
        console.log("Error updating log",err);
    }
}

export async function deleteLog(logName:string){
    try{
        const existingLog = await prisma.log.findUnique({
            where:{logName: logName, isDeleted: false}
        });

        if(!existingLog){
            console.log("Log not found");
            return null;
        }
        if(existingLog.logImage){
            const imagePath = path.join("uploads",existingLog.logImage);
            fs.unlink(imagePath, (err) => {
                if(err){
                    console.log("Error deleting image file",err);
                }else {
                    console.log("Deleted image file", imagePath);
                }
            });
        }
        const deletedLog = await prisma.log.update({
            where: {logName: logName},
            data: {isDeleted: true}
        })
        console.log("Deleted log",logName);
        return deletedLog;
    }catch (err){
        console.log("Error deleting log",err);
    }
}

export async function getAllLogs(){
    try{
        return prisma.log.findMany({
            where: {isDeleted: false}
        });
    }catch (error){
        console.log("Error getting log data from the database",error);
    }
}