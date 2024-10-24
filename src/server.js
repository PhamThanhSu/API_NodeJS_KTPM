import express from "express";
import configViewEngine from "./config/viewEngine";
import initwebRoutes from "./routes/web";
require("dotenv").config();

const app = express();

//config view engine
configViewEngine(app);
//inti web routes
initwebRoutes(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("JWT Backend is running on localhost:" + PORT);
});