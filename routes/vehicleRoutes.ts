import express from "express";
import {Vehicle} from "../models/dtos/Vehicle";
import {addVehicle, deleteVehicle, getAllVehicles, updateVehicle} from "../database/vehicleDataStore";

const router = express.Router();

router.post("/add",async (req, res) => {
    const vehicle:Vehicle = {
        licensePlateNumber: req.body.licensePlateNumber,
        category: req.body.category,
        fuelType: req.body.fuelType,
        status: req.body.status,
        remarks: req.body.remarks,
        staffMember: req.body.staffMember,
        isDeleted: false
    };
    try{
        const addedVehicle = await addVehicle(vehicle);
        res.json(addedVehicle);
    }catch (error){
        console.log("Error saving vehicle",error);
        res.status(400).send("Error saving vehicle");
    }
})

router.put("/update/:licenseNumber",async (req,res) => {
    const licenseNumber: string = req.params.licenseNumber;
    const vehicle:Vehicle = {
        licensePlateNumber: req.body.licensePlateNumber,
        category: req.body.category,
        fuelType: req.body.fuelType,
        status: req.body.status,
        remarks: req.body.remarks,
        staffMember: req.body.staffMember,
        isDeleted: false
    };
    try{
        const updatedVehicle = await updateVehicle(licenseNumber,vehicle);
        res.json(updatedVehicle);
    }catch (error){
        console.log("Error updating vehicle",error);
        res.status(400).send("Error updating vehicle");
    }
})

router.delete("/delete/:licenseNumber",async (req,res) => {
    const licenseNumber: string = req.params.licenseNumber
    try{
        const deletedVehicle = await deleteVehicle(licenseNumber);
        res.json(deletedVehicle);
    }catch (error){
        console.log("Error deleting vehicle",error);
        res.status(400).send("Error deleting vehicle");
    }
})

router.get("/view",async (req,res)=> {
    try{
        const vehicles = await getAllVehicles();
        res.json(vehicles);
    }catch (error){
        console.log("Error getting all vehicles",error);
        res.status(400).send("Error getting all vehicles");
    }
})

export default router;