// server.js
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { syncModels } from './Models/index.js'; 
import sequelize from './config/db.js'; 
import userRoute from "./Routes/userRoute.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/api', userRoute);

app.listen(PORT, async () => {
  console.log(`Your server is running successfully on port ${PORT}`);
  
  try {
    await syncModels(); // sare model sync 
    await sequelize.authenticate(); 
    console.log("Db connected .");
  } catch (error) {
    console.error("Unable to connect db", error);
  }
});
