import { prisma } from "../lib/prisma.js";

export async function getTasks(req, res) {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function createTask(req, res) {

  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Le titre est obligatoire" });
  }

  try {
    const task = await prisma.task.create({ data: { title: title.trim() } });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function updateTask(req, res) {

  const id = Number(req.params.id);

  const { title, completed } = req.body;

  const data = {};

  if (title !== undefined) data.title = title.trim();
  
  if (completed !== undefined) {
    data.completed = completed;
    data.completedAt = completed ? new Date() : null;
  }

  try {
    const task = await prisma.task.update({ where: { id }, data });
    res.json(task);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tâche introuvable" });
    }
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function deleteTask(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tâche introuvable" });
    }
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}