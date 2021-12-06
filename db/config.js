const mongoose = require("mongoose");

const dbConnection = async () =>{
    try{
        console.time("DB connection");
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.timeEnd("DB connection");
        console.log("DB Online!");
    }catch(err){
        console.log(err);
        throw new Error("Error while trying to initiate DB");
    };
};

module.exports = {
    dbConnection
};