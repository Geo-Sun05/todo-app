import { useState } from "react";

export default function TaskForm({ onAdd, onClose }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd(title);
    setTitle("");
    onClose();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche"
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
      />
      <button
        type="submit"
        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Ajouter
      </button>
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
      >
        Annuler
      </button>
    </form>
  );
}