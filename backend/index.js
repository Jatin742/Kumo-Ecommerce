const app=require("./app");
const dotenv=require("dotenv").config();
const connectToMongo =require("./db.js");
const PORT=process.env.PORT||4000;
const cloudinary=require("cloudinary").v2;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


connectToMongo();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

app.listen(PORT,()=>{
    console.log(`Server is listening at PORT ${PORT} http://localhost:${PORT}/`);
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });