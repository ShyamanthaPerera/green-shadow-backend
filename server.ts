import express from "express";
import fieldRoutes from "./routes/fieldRoutes"
import cropRoutes from "./routes/cropRoutes"
import staffRoutes from "./routes/staffRoutes"
import logRoutes from "./routes/logRoutes"
import vehicleRoutes from "./routes/vehicleRoutes"
import equipmentRoutes from "./routes/equipmentRoutes";
import UserRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config()

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));


// routes
app.use('/auth', UserRoutes);
app.use('/field', fieldRoutes);
app.use('/crop', cropRoutes);
app.use('/staff', staffRoutes);
app.use('/log',logRoutes);
app.use('/vehicle',vehicleRoutes);
app.use('/equipment',equipmentRoutes);
app.use('/uploads',express.static("uploads"));

app.listen(3000,(err) => {
    console.log("Server running on port 3000");
});
