import { Request, Response, Router } from "express";
import { pool } from "../../config/db";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email]
    );
    console.log(result.rows[0]);

    res.status(201).json({
      success: true,
      message: "Data inserted",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    res.status(200).json({
      success: true,
      message: "user retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
