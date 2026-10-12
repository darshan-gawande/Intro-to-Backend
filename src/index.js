import connectDB from "./config/database.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});


const startServer = async() => {
    try {
        console.log("MONGODB_URI: ", process.env.MONGODB_URI);
        
        await connectDB();

        app.on("error", (error) => {
            console.log("Error", error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`The server is listening following port: ${(process.env.PORT)}`);
        });

    } catch (error) {
        console.log("Server connection failed!!!", error);
    }
};

startServer();
