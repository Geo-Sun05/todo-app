import "dotenv/config";
import express from "express";
import cors from "cors";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", tasksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});