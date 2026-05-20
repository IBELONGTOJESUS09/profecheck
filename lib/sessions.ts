const SESSION_KEY = "profecheck_user_id";
const GROUP_KEY = "profecheck_group";

export const PROFECHECK_GROUPS = ["4DPGM", "4CPGM", "6DPGM", "6CPGM"] as const;
export type ProfeCheckGroup = (typeof PROFECHECK_GROUPS)[number];

export function saveSession(userId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, userId);
}

export function readSession() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

export function saveGroup(group: ProfeCheckGroup) {
  if (typeof window === "undefined") return;
  localStorage.setItem(GROUP_KEY, group);
}

export function readGroup(): ProfeCheckGroup | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(GROUP_KEY);
  if (!raw) return null;
  return (PROFECHECK_GROUPS as readonly string[]).includes(raw) ? (raw as ProfeCheckGroup) : null;
}

export function clearGroup() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GROUP_KEY);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(GROUP_KEY);
}
