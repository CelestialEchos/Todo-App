import pool from "../database";
import { Request, Response } from "express";

const todoController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const sql: string = "SELECT * FROM todo ";
      const { rows } = await pool.query(sql);
      return res.json(rows);
    } catch (error: any) {
      return res.json({ msg: error.msg });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { rows } = await pool.query("select * from todo where id = $1", [
        req.params.id,
      ]);

      if (rows[0]) {
        return res.json(rows[0]);
      }

      res.status(404).json({ msg: "not found" });
    } catch (error: any) {
      res.json({ msg: error.msg });
    }
  },

  addNewTodo: async (req: Request, res: Response) => {
    const { content } = req.body;
    console.log(req.body);

    const sql: string = "INSERT INTO todo( content) VALUES($1) RETURNING *";
    const { rows } = await pool.query(sql, [content]);
    res.json(rows[0]);
  },

  updateById: async (req: Request, res: Response) => {
    try {
      const { content, hasCompleted } = req.body;
      if (content) {
        const sql = "UPDATE todo set content = $1 where id = $2 RETURNING *";
        const { rows } = await pool.query(sql, [content, req.params.id]);
        res.json(rows[0]);
      } else if (hasCompleted != null && hasCompleted != undefined) {
        const sql =
          'UPDATE todo set "hasCompleted" = $1 where id = $2 RETURNING *';
        const { rows } = await pool.query(sql, [hasCompleted, req.params.id]);
        res.json(rows[0]);
      }
    } catch (error: any) {
      res.json({ msg: error.msg });
    }
  },

  deleteById: async (req: Request, res: Response) => {
    try {
      const sql = "DELETE FROM todo where id = $1 RETURNING *";

      const { rows } = await pool.query(sql, [req.params.id]);

      if (rows[0]) {
        return res.json(rows[0]);
      }
      return res.status(404).json({ msg: "not found" });
    } catch (error: any) {
      res.json({ msg: error.msg });
    }
  },
};

export default todoController;
