import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import notFoundError from "./app/middleware/notFoundError";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// aplication routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("flower Management Dashboard server!");
});

app.use(notFoundError);

app.use(globalErrorHandler);

export default app;
