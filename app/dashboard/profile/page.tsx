"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  clearSession,
  PROFECHECK_GROUPS,
  ProfeCheckGroup,
  readGroup,
  readSession,
  saveGroup
} from "@/lib/sessions";

type SettingsState = {
  pushNotifs: boolean;
  emailNotifs: boolean;
  classReminders: boolean;
  darkInterface: boolean;
  compactMode: boolean;
  autoRefresh: boolean;
  showWeekends: boolean;
  publicProfile: boolean;
  language: "es";
};

const SETTINGS_KEY = "profecheck_settings";

const defaultSettings: SettingsState = {
  pushNotifs: true,
  emailNotifs: false,
  classReminders: true,
  darkInterface: true,
  compactMode: false,
  autoRefresh: true,
  showWeekends: false,
  publicProfile: false,
  language: "es"
};

function Toggle({
  label,
  description,
  checked,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div>
        <p className="font-medium text-white">{label}</p>
        <p className="text-xs text-zinc-400">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
          checked ? "bg-emerald-500" : "bg-zinc-700"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </label>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [group, setGroup] = useState<ProfeCheckGroup>("4DPGM");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const activeSession = readSession();
    if (!activeSession) {
      router.replace("/login");
      return;
    }

    const savedGroup = readGroup();
    if (savedGroup) setGroup(savedGroup);

    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Partial<SettingsState>;
      setSettings((prev) => ({ ...prev, ...parsed, language: "es" }));
    } catch {
      setSettings(defaultSettings);
    }
  }, [router]);

  const userId = useMemo(() => readSession() ?? "Sin sesión", []);

  const handleToggle = (key: keyof SettingsState, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setStatusMessage("");
  };

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    saveGroup(group);
    setStatusMessage("Configuración guardada correctamente.");
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setGroup("4DPGM");
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
    saveGroup("4DPGM");
    setStatusMessage("Configuración restablecida por defecto.");
  };

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <section className="mx-auto w-full max-w-3xl space-y-4 p-4 pb-24 text-white sm:p-6">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Configuración</h1>
        <p className="mt-1 text-sm text-zinc-300">Administra preferencias de la aplicación y tu cuenta.</p>
      </header>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur-sm">
        <h2 className="text-lg font-semibold">Cuenta</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-400">ID de sesión</p>
            <p className="mt-1 text-sm font-medium">{userId}</p>
          </div>
          <label className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-400">Grupo activo</p>
            <select
              className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
              value={group}
              onChange={(e) => setGroup(e.target.value as ProfeCheckGroup)}
            >
              {PROFECHECK_GROUPS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur-sm">
        <h2 className="text-lg font-semibold">Notificaciones</h2>
        <div className="mt-3 space-y-2">
          <Toggle
            label="Notificaciones push"
            description="Recibe avisos instantáneos en el dispositivo."
            checked={settings.pushNotifs}
            onChange={(next) => handleToggle("pushNotifs", next)}
          />
          <Toggle
            label="Notificaciones por matrícula"
            description="Envía comunicados y recordatorios por este medio."
            checked={settings.emailNotifs}
            onChange={(next) => handleToggle("emailNotifs", next)}
          />
          <Toggle
            label="Recordatorios de clase"
            description="Recibir alerta antes del inicio de clase."
            checked={settings.classReminders}
            onChange={(next) => handleToggle("classReminders", next)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur-sm">
        <h2 className="text-lg font-semibold">Apariencia y sistema</h2>
        <div className="mt-3 space-y-2">
          <Toggle
            label="Interfaz oscura"
            description="Mantener diseño oscuro premium."
            checked={settings.darkInterface}
            onChange={(next) => handleToggle("darkInterface", next)}
          />
          <Toggle
            label="Modo compacto"
            description="Reduce espacios para ver más contenido."
            checked={settings.compactMode}
            onChange={(next) => handleToggle("compactMode", next)}
          />
          <Toggle
            label="Actualización automática"
            description="Refresca datos de asistencia automáticamente."
            checked={settings.autoRefresh}
            onChange={(next) => handleToggle("autoRefresh", next)}
          />
          <Toggle
            label="Mostrar fines de semana"
            description="Muestra sábado y domingo en vistas semanales."
            checked={settings.showWeekends}
            onChange={(next) => handleToggle("showWeekends", next)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur-sm">
        <h2 className="text-lg font-semibold">Privacidad</h2>
        <div className="mt-3 space-y-2">
          <Toggle
            label="Perfil visible"
            description="Permite que docentes del plantel vean tu perfil."
            checked={settings.publicProfile}
            onChange={(next) => handleToggle("publicProfile", next)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-white transition hover:bg-emerald-600"
        >
          Guardar cambios
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-xl bg-zinc-700 px-4 py-2 font-semibold text-white transition hover:bg-zinc-600"
        >
          Restablecer
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl bg-rose-600 px-4 py-2 font-semibold text-white transition hover:bg-rose-700"
        >
          Cerrar sesión
        </button>
      </div>

      {statusMessage ? <p className="text-sm text-emerald-300">{statusMessage}</p> : null}
    </section>
  );
}
