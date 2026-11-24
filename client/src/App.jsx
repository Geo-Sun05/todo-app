import { useEffect, useState } from "react";
import { getTasks } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((e) => setError(e.message));
  }, []);

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <p>
        Total : {tasks.length} | En attente : {pending.length} | Terminées : {completed.length}
      </p>
      <h2>En attente</h2>
      <ul>{pending.map((t) => <li key={t.id}>{t.title}</li>)}</ul>
      <h2>Terminées</h2>
      <ul>{completed.map((t) => <li key={t.id}>{t.title}</li>)}</ul>
    </div>
  );
}