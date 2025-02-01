const mongoose = require("mongoose");

const ConnectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongoose Database Connection successfull!")
    }
    catch(error){
        console.log(error || "Database Error");
    }
}

module.exports = ConnectDb;