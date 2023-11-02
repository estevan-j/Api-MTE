import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { connectDB } from "./db/connection";
import "dotenv/config";
import router from './routers/index'

const app = express();

// Middleware
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use('/', router())

const start = async () => {
  try {
    const url = process.env.MONGO_URI || "no hay connection"; 
    await connectDB(url);
    server.listen(8080, () =>
      console.log(`Sever runing on http://localhost:8080/`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
