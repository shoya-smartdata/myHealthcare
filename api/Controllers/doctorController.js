import { where } from "sequelize";
import { Doctor } from "../Models/index.js";


export const adddoctor = async (req, res)=>{
    try {
        const { name, contactNo, specialization, address} = req.body;
        const existingDoctor = await Doctor.findOne({where : {email}});
        if(existingDoctor){
            res.status(400).json({
                message: "user already regester with this email address!"
            });
        }
        const doctor = Doctor.create
   
    } catch (error) {
        
    }
}