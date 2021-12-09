const express = require("express");
const routerApi = require("./routes/");
const cors = require("cors");
const path = require("path");
const { dbConnection } = require("./db/config");
require("dotenv").config();

// CREATE EXPRESS SERVER
const app = express();

// CONNECT DB
dbConnection();

// PUBLIC DIR
// app.use(express.static("public"));

// CORS
app.use(cors());

// READ AND PARSE BODY
app.use(express.json());

// ROUTES
routerApi(app);

// HANDLE ROUTES
app.use("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "public/index.html"));
})


// PORTS
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
});



