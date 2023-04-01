import "dotenv/config"
import mongoose from "mongoose";

const dbConnection = async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        .then(() => {
            console.log("Database connected successfully")
        }).catch(console.error)
}

export default dbConnection