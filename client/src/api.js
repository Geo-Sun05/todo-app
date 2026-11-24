const API_URL = "http://localhost:3000/api/tasks";
      
async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Erreur réseau");
  }
  return res.status === 204 ? null : res.json();
}
     
const jsonOptions = (method, data) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

export const getTasks = () => request(API_URL);
export const createTask = (title) => request(API_URL, jsonOptions("POST", { title }));
export const updateTask = (id, data) => request(`${API_URL}/${id}`, jsonOptions("PUT", data));
export const deleteTask = (id) => request(`${API_URL}/${id}`, { method: "DELETE" });