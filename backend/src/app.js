import bodyParser from "body-parser";
import express from "express";
import votingRoutes from "./routes/voting.routes.js";

const app = express();

app.use(bodyParser.json());
app.use("/", votingRoutes);

export default app;
