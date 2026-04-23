import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv();
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

export default app; 