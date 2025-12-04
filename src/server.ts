import express, { Request, Response } from "express";
const app = express();
const port = 5000;
import { Pool } from "pg";
import config from "./config";

const pool = new Pool({
  connectionString: config.postgres_url,
});

// parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! Next");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);

  res.status(201).json({
    success: true,
    message: "Api is working",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
