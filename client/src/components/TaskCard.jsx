import { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";

const iconBtn =
  "flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50";

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
    <li className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          className="h-4 w-4 shrink-0 accent-gray-800"
        />

        {isEditing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-gray-900"
          />
        ) : (
          <div className="min-w-0">
            <p
              className={`truncate font-medium ${
                task.completed ? "text-gray-500 line-through" : "text-gray-900"
              }`}
            >
              {task.title}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {task.completed
                ? `Completed: ${new Date(task.completedAt).toLocaleDateString()}`
                : `Created: ${new Date(task.createdAt).toLocaleDateString()}`}
            </p>
          </div>
        )}
      </div>

      <div className="flex shrink-0 gap-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-700">
              Enregistrer
            </button>
            <button onClick={handleCancel} className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">
              Annuler
            </button>
          </>
        ) : (
          <>
            {!task.completed && (
              <button onClick={() => setIsEditing(true)} className={iconBtn} aria-label="Modifier">
                <SquarePen size={16} />
              </button>
            )}
            <button onClick={() => onDelete(task.id)} className={iconBtn} aria-label="Supprimer">
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}