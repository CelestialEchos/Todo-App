import { Router } from "express";
import todoController from "../controllers/todo.controller";

let router = Router();

router.get("/todo", todoController.getAll);
router.post("/todo", todoController.addNewTodo);
router.get("/todo/:id", todoController.getById);
router.patch("/todo/:id", todoController.updateById);
router.delete("/todo/:id", todoController.deleteById);

export default router;
