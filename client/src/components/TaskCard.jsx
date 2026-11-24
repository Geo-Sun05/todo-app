import { useState } from "react";

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  async function handleSave() {
    if (!draft.trim()) return;
    await onEdit(task.id, draft);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(task.title);
    setIsEditing(false);
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />

      {isEditing ? (
        <>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} />
          <button onClick={handleSave}>Enregistrer</button>
          <button onClick={handleCancel}>Annuler</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
          <small>
            {task.completed
              ? ` Completed: ${new Date(task.completedAt).toLocaleDateString()}`
              : ` Created: ${new Date(task.createdAt).toLocaleDateString()}`}
          </small>
          {!task.completed && <button onClick={() => setIsEditing(true)}>Modifier</button>}
          <button onClick={() => onDelete(task.id)}>Supprimer</button>
        </>
      )}
    </li>
  );
}