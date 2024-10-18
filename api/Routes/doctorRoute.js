import express from 'express'


const doctorRoute = express.Router();
import { adddoctor } from '../Controllers/doctorController.js';


doctorRoute.post('/adddoctore', adddoctor);


export default doctorRoute;
