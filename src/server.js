import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
require("dotenv").config();
import bodyParser from "body-parser";

const app = express();

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


initApiRoutes(app);
initWebRoutes(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Backend is running on localhost:" + PORT);
});