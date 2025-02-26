import express, { Request, Response } from "express";
import Task, { ITask } from "../models/Task";

const router = express.Router();

// CREATE a new task
router.post("/", async (req: Request, res: Response) => {
  try {
    const task: ITask = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
});

// READ all tasks
router.get("/", async (_req: Request, res: Response) => {
  try {
    const tasks: ITask[] = await Task.find();
    res.json(tasks);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a task
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const task: ITask | null = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a task
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
