import { connect } from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const DatabaseURL = process.env.MONGO_URI;


const connectDb = async () => {
    try {
        await connect(DatabaseURL, {
           
        });

        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error(`❌ Error connecting to database: ${error.message}`);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDb;
