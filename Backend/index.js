import express from "express"
import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin:'*',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','auth-token']
}))

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Backend running")
})

app.use('/api',userRoute)

app.listen(PORT,()=>{
    console.log(`Server listening on PORT no ${PORT}`)
})