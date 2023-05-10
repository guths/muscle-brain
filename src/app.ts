import exp from "constants";
import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./lib/Errors/error.handler";

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api", routes);
app.use(errorHandler);

export default app;
