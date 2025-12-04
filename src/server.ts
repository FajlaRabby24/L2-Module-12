import express, { Request, Response } from "express";
const app = express();
const port = 5000;
import { Pool } from "pg";
import config from "./config";

// parser
app.use(express.json());

// database
const pool = new Pool({
  connectionString: config.postgres_url,
});
const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    due_data DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )    
    `);
};

initDB();

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
