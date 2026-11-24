import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((e) => setError(e.message));
  }, []);

  async function handleAdd(title) {
    try {
      const task = await createTask(title);
      setTasks((prev) => [task, ...prev]);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleToggle(task) {
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleEdit(id, title) {
    try {
      const updated = await updateTask(id, { title });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  return (
    <div>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

      <TaskForm onAdd={handleAdd} />

      <p>
        Total : {tasks.length} | En attente : {pending.length} | Terminées : {completed.length}
      </p>

      <h2>Pending Tasks</h2>
      <ul>
        {pending.map((t) => (
          <TaskCard key={t.id} task={t} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul>
        {completed.map((t) => (
          <TaskCard key={t.id} task={t} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}