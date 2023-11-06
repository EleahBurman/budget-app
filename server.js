//npm packages
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
// import axios from 'axios';

// import routes
import { router as indexRouter } from './routes/index.js';

const PORT = 4000;

// create the express app
const app = express();

// basic middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('dist'));


// mount imported routes
app.use("/api", indexRouter)
//server your build files
//for production

// app.post('/currency-converter', async (req , res)=>{
//   const apiUrl = `https://api.fastforex.io/fetch-all?api_key=${process.env.API_KEY}`;

//   try {

//     const response = await axios.get(apiUrl);
//     res.json(response.data.rates)

//   } catch(err){

//     console.error('Error fetching exchange rates:', error);
//   }

// });

app.get("/hello", (req,res)=>{
  res.json({
    message: "hello world"
  })
})

async function main(){
  await mongoose.connect(process.env.MONGOOSE_CONNECT);
  console.log("mongo db connected")
}

main().catch(console.error);

app.listen(PORT, ()=>{
  console.log("listening on port ", PORT)
})

