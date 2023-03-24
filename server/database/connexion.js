const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        //mongodb connection string
        const connexion = await mongoose.connect("mongodb+srv://romainkabasi:muhika_13@cluster0.uw2zabe.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`MongoDB connected : ${connexion.connection.host}`)
    }catch(err){
        console.log(err);
        process.exit(1)
    }  
}

module.exports = connectDB;