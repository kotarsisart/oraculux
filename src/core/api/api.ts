export const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
