import express from "express";
import {Staff} from "../models/dtos/Staff";
import {addStaff, deleteStaff, getAllStaff, getAllStaffNames, updateStaff} from "../database/staffDataStore";

const router = express.Router();

router.post("/add",async (req,res)=>{
    const staff:Staff = {
        name: req.body.name,
        designation: req.body.designation,
        gender: req.body.gender,
        joinedDate: new Date(req.body.joinedDate),
        dob: new Date(req.body.dob),
        address: req.body.address,
        contact: req.body.contact,
        email: req.body.email,
        fieldName: req.body.fieldName,
        isDeleted: false
    };
    try{
        const addedStaffMember = await addStaff(staff);
        res.json(addedStaffMember);
    }catch(err){
        console.log("Error Saving staff",err);
        res.status(400).send("Error adding staff");
    }
})

router.put("/update/:name",async (req,res) => {
    const name: string = req.params.name;
    const staff:Staff = {
        name: req.body.name,
        designation: req.body.designation,
        gender: req.body.gender,
        joinedDate: new Date(req.body.joinedDate),
        dob: new Date(req.body.dob),
        address: req.body.address,
        contact: req.body.contact,
        email: req.body.email,
        fieldName: req.body.fieldName,
        isDeleted: false
    };
    try{
        const updatedStaffMember = await updateStaff(name,staff);
        res.json(updatedStaffMember);
    }catch(err){
        console.log("Error Updating staff",err);
        res.status(400).send("Error updating staff");
    }
})

router.delete("/delete/:name",async (req,res) => {
    const name: string = req.params.name;
    try{
        const deletedStaffMember = await deleteStaff(name);
        res.json(deletedStaffMember);
    }catch (error){
        console.log("Error deleting staff",error);
        res.status(400).send("Error deleting staff");
    }
})

router.get("/view",async (req,res)=> {
    try{
        const staffMembers = await getAllStaff();
        res.json(staffMembers);
    }catch(err){
        console.log("Error getting all staff members",err);
        res.status(400).send("Error getting all  staff members");
    }
})

router.get("/staff",async (req,res)=> {
    try{
        const staffNames = await getAllStaffNames();
        res.json(staffNames);
    }catch (error){
        console.log("Error getting staff names",error);
        res.status(400).send("Error getting staff names");
    }
})

export default router;
