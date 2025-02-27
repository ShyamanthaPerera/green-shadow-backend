import express from "express";
import {Equipment} from "../models/dtos/Equipment";
import {addEquipment, deleteEquipment, getAllEquipment, updateEquipment} from "../database/equipDataStore";

const router = express.Router();

router.post("/add",async (req, res) => {
    const equipment:Equipment = {
        equipName: req.body.equipName,
        equipType: req.body.equipType,
        status: req.body.status,
        staffMember: req.body.staffMember,
        fieldName: req.body.fieldName,
        isDeleted: false
    };
    try{
        const addedEquipment = await addEquipment(equipment);
        res.json(addedEquipment);
    }catch (error){
        console.log("Error saving equipment",error);
        res.status(400).send("Error saving equipment");
    }
})

router.put("/update/:equipName",async (req,res) => {
    const equipName: string = req.params.equipName;
    const equipment:Equipment = {
        equipName: req.body.equipName,
        equipType: req.body.equipType,
        status: req.body.status,
        staffMember: req.body.staffMember,
        fieldName: req.body.fieldName,
        isDeleted: false
    };
    try{
        const updatedEquipment = await updateEquipment(equipName,equipment);
        res.json(updatedEquipment);
    }catch (error){
        console.log("Error updating equipment",error);
        res.status(400).send("Error updating equipment");
    }
})

router.delete("/delete/:equipName",async (req,res) => {
    const equipName: string = req.params.equipName;
    try{
        const deletedEquipment = await deleteEquipment(equipName);
        res.json(deletedEquipment);
    }catch (error){
        console.log("Error deleting equipment",error);
        res.status(400).send("Error deleting equipment");
    }
})

router.get("/view",async (req,res)=> {
    try{
        const equipments = await getAllEquipment();
        res.json(equipments);
    }catch (error){
        console.log("Error getting all equipments",error);
        res.status(400).send("Error getting all equipments");
    }
})

export default router;