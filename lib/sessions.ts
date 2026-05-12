const SESSION_KEY = "profecheck_user_id";

export function saveSession(userId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, userId);
}

export function readSession() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
