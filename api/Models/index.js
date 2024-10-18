// models/index.js
import sequelize from '../config/db.js'; 
import UserModel from './userModel.js';
import doctorsModel from './doctorsModel.js';
import Sequelize from 'sequelize';

const User = UserModel(sequelize, Sequelize.DataTypes);
const Doctor = doctorsModel(sequelize, Sequelize.DataTypes);


const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); 
  } catch (error) {
    console.error("not synced !", error);
  }
};


export { User, Doctor , syncModels };
