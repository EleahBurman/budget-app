
import express from 'express';
import mongoose from 'mongoose';

// import cors from 'cors';
import 'dotenv/config';
import axios from 'axios';
import router from './routes/index.js';

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('dist'));

app.use("/api", router)
//server your build files
//for production

app.post('/currency-converter', async (req , res)=>{
  const apiUrl = `https://api.fastforex.io/fetch-all?api_key=${process.env.API_KEY}`;

  try {

    const response = await axios.get(apiUrl);
    res.json(response.data.rates)

  } catch(err){

    console.error('Error fetching exchange rates:', error);
  }

});

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



