import express from "express";
import homeController from '../controller/homeController.js';

const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */
const initWebRoutes = (app) => {
    router.get("/home", homeController.handleHomePage);
    app.use("/", router);
}

export default initWebRoutes;