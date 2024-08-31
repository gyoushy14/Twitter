import mongoose from "mongoose";

const connection = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`${conn.connection.host}+ Connected`);
        
    } catch (error) {
        console.log("error");
        process.exit(1);
        
    }
}

export default connection;