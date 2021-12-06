const express = require("express");
const routerApi = require("./routes/");
const cors = require("cors");
const { dbConnection } = require("./db/config");
require("dotenv").config();

// CREATE EXPRESS SERVER
const app = express();

// CONNECT DB
dbConnection();

// PUBLIC DIR
app.use(express.static("public"));

// CORS
app.use(cors());

// READ AND PARSE BODY
app.use(express.json());

// ROUTES
routerApi(app);

// PORTS
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
});



