import { useEffect, useState } from "react";
import { User, Plus } from "lucide-react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import StatCard from "./components/StatCard";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
    <div className="mx-auto max-w-4xl px-6 py-8">
      <header className="flex items-center gap-3">
        <User size={24} />
        <h1 className="text-2xl font-bold">Mes tâches</h1>
      </header>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Erreur : {error}
        </p>
      )}

      <button
        onClick={() => setShowForm((v) => !v)}
        className="mt-6 flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        <Plus size={16} />
        Add New Task
      </button>

      {showForm && <TaskForm onAdd={handleAdd} onClose={() => setShowForm(false)} />}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Tasks" value={tasks.length} />
        <StatCard label="Pending" value={pending.length} color="text-orange-600" />
        <StatCard label="Completed" value={completed.length} color="text-green-600" />
      </div>

      <h2 className="mt-8 text-lg font-semibold">Pending Tasks</h2>
      <ul className="mt-3 space-y-3">
        {pending.map((t) => (
          <TaskCard key={t.id} task={t} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </ul>

      <h2 className="mt-8 text-lg font-semibold">Completed Tasks</h2>
      <ul className="mt-3 space-y-3">
        {completed.map((t) => (
          <TaskCard key={t.id} task={t} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}