import express from "express";
import multer from "multer";
import {Crop} from "../models/dtos/Crop";
import {addCrop, deleteCrop, getAllCropNames, getAllCrops, updateCrop} from "../database/cropDataStore";
import {storage} from "../util/Storage";

const router = express.Router();

const upload = multer({ storage: storage });

router.post("/add",upload.single("cropImage"), async (req, res) => {
    let cropImage: string | undefined = undefined;
    if(req.file){
        cropImage = `/uploads/${req.file.filename}`;
    }
    const crop:Crop = {
        commonName: req.body.commonName,
        scientificName: req.body.scientificName,
        category: req.body.category,
        cropImage: cropImage,
        fieldName: req.body.fieldName,
        isDeleted: false
    };
    try{
        const addedCrop = await addCrop(crop);
        res.json(addedCrop);
    }catch(err){
        console.log("Error Saving crop",err);
        res.status(400).send("Error adding crop");
    }
})

router.put("/update/:commonName",upload.single("cropImage"),async (req,res) => {
    const commonName: string = req.params.commonName;
    let cropImage: string | undefined = undefined;
    if(req.file){
        cropImage = `/uploads/crop/${req.file.path}`;
    }
    const crop:Crop = {
        commonName: req.body.commonName,
        scientificName: req.body.scientificName,
        category: req.body.category,
        cropImage: cropImage,
        fieldName: req.body.fieldName,
        isDeleted: false
    };
    try{
        const updatedCrop = await updateCrop(commonName,crop);
        res.json(updatedCrop);
    }catch(err){
        console.log("Error updating crop", err);
        res.status(400).send("Error updating crop");
    }
})

router.delete("/delete/:commonName",async (req,res) => {
    const commonName: string = req.params.commonName;
    try{
        const deletedCrop = await deleteCrop(commonName);
        res.json(deletedCrop);
    }catch(err){
        console.log("Error deleting crop",err);
        res.status(400).send("Error deleting crop");
    }
})

router.get("/view",async (req,res) => {
    try{
        const crops = await getAllCrops();
        res.json(crops);
    }catch(err){
        console.log("Error getting all crops",err);
        res.status(400).send("Error getting all crops");
    }
})

router.get("/crops",async (req,res) => {
    try{
        const cropNames = await getAllCropNames();
        res.json(cropNames);
    }catch(err){
        console.log("Error getting crop names",err);
        res.status(400).send("Error getting crop names");
    }
})

export default router;
