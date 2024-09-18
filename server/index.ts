import express from "express";
import todoRouter from "./routers/todo.router";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", todoRouter);

app.listen(8000, () => {
  console.log("Server Started");
});
