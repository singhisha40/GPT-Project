// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const response = await client.responses.create({
//   model: "deepseek/deepseek-chat",
//   input: 'Tell me a joke related to Computer Science',
// });

// console.log(response.output_text);

// import OpenAI from "openai";
// import 'dotenv/config';

// const client = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const response = await client.chat.completions.create({
//   model: "deepseek/deepseek-chat",
//   messages: [
//     {
//       role: "user",
//       content: "Hello!"
//     }
//   ]
// });

// console.log(response.choices[0].message.content);
import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.send("API working");
});

const connectDB = async()=>{
  try{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Successfully connected to DB");
  }catch(err){
    console.log("Failed to connect to DB",err);
  }
}

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: "openrouter/free",
//       messages: [
//       {
//       role: "user",
//       content: req.body.message
//       }
//     ]
//     })

//   };

//   try {
//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       options
//     );
//     const data = await response.json();
//     console.log(data.choices[0].message.content);
//     res.send(data.choices[0].message.content);
//   }  catch (err) {
//     console.error(err);

//     res.status(500).json({
//       error: err.message
//     });
//   }
// });

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
   connectDB();
});
