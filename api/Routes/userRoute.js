import express from 'express'
import {login, signup} from "../Controllers/userController.js"

const userRoute = express.Router();


userRoute.post('/register', signup);
userRoute.post('/login', login);

export default userRoute;
