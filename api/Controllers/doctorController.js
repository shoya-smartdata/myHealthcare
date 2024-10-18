
import { log } from "console";
import { Doctor } from "../Models/index.js";


export const adddoctor = async (req, res)=>{
    try {
        const { name, contactNo, specialization, address} = req.body;
        
        console.log(req.body);
        
    const doctor = await Doctor.create({ name, contactNo, specialization, address });
    res.status(201).json({
       message: "useer register successfully !",
       doctor
    })
   
   
    } catch (error) {
        res.status(400).json({
            message: "unable to add dr !"
        })
    }
}