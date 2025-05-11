import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import Routes from "./Routes";
import { errorHandler } from "./Middlewares/errorHandler";

const app = express();

if (process.env.PORT === undefined) {
  throw new Error("PORT is not defined");
}

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", Routes());

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
