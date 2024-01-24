import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// aplication routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("flower Management Dashboard server!");
});

export default app;
