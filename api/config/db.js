// db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DATABASE = process.env.DATABASE;

const DB_PASS = process.env.DB_PASS;
const HOST_NAME = process.env.HOST_NAME;

const sequelize = new Sequelize(DATABASE, 'root', DB_PASS, {
  host: HOST_NAME,
  dialect: "mysql",
});

export default sequelize;
