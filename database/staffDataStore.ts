import { PrismaClient } from "@prisma/client";
import {Staff} from "../models/dtos/Staff";

const prisma = new PrismaClient();

export async function addStaff(s:Staff){
    try{
        const newStaffMember = await prisma.staff.create({
            data:{
                name: s.name,
                designation: s.designation,
                gender: s.gender,
                joinedDate: s.joinedDate,
                dob: s.dob,
                address: s.address,
                contact: s.contact,
                email: s.email,
                fieldName: s.fieldName,
                isDeleted: false
            }
        })
        console.log("Staff member added",newStaffMember);
        return newStaffMember;
    }catch(err){
        console.log("Error adding staff member",err);
    }
}

export async function updateStaff(name:string,s:Staff){
    try{
        const existingStaffMember = await prisma.staff.findUnique({
            where:{name: name, isDeleted:false}
        });

        if(!existingStaffMember){
            console.log("Staff not found");
            return null;
        }
        const updatedStaffMember = await prisma.staff.update({
            where: {name: name, isDeleted: false},
            data: {
                name: s.name || existingStaffMember.name,
                designation: s.designation || existingStaffMember.designation,
                gender: s.gender || existingStaffMember.gender,
                joinedDate: s.joinedDate || existingStaffMember.joinedDate,
                dob: s.dob || existingStaffMember.dob,
                address: s.address || existingStaffMember.address,
                contact: s.contact || existingStaffMember.contact,
                email: s.email || existingStaffMember.email,
                fieldName: s.fieldName || existingStaffMember.fieldName
            },
        })
        console.log("Updated Staff Member",updatedStaffMember);
        return updatedStaffMember;
    }catch(err){
        console.log("Error updating staff member",err);
    }
}

export async function deleteStaff(name:string){
    try{
        const existingStaffMember = await prisma.staff.findUnique({
            where:{name: name, isDeleted: false}
        });

        if(!existingStaffMember){
            console.log("Staff not found");
            return null;
        }

        const deletedStaffMember = await prisma.staff.update({
            where: {name: name},
            data: {isDeleted: true},
        });
        console.log("Deleted staff member",name);
        return deletedStaffMember;
    }catch (err){
        console.log("Error deleting staff member",err);
    }
}

export async function getAllStaff(){
    try{
        return prisma.staff.findMany({
            where:{isDeleted:false}
        });
    }catch (error){
        console.log("Error getting staff details from the database",error);
    }
}

export async function getAllStaffNames(){
    try {
        const staffNames = await prisma.staff.findMany({
            where:{isDeleted:false},
            select: {
                name: true
            }
        });
        return staffNames.map(staff => staff.name);
    }catch (error){
        console.log("Error getting staff names",error);
    }
}