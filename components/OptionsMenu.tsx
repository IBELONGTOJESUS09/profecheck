"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clearGroup, clearSession } from "@/lib/sessions";

function GearIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export default function OptionsMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!showLogoutConfirm) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowLogoutConfirm(false);
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [showLogoutConfirm]);

  const handleChangeGroup = () => {
    clearGroup();
    setOpen(false);
    router.push("/group-select");
  };

  const handleLogoutClick = () => {
    setOpen(false);
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    clearSession();
    setShowLogoutConfirm(false);
    router.push("/login");
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <div ref={rootRef} className="fixed right-4 top-4 z-30 sm:right-6 sm:top-6">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label="Ajustes"
          className="flex items-center gap-2 rounded-xl border border-brand-600/50 bg-brand-900/90 px-3 py-2 text-sm font-semibold text-brand-50 shadow-lg backdrop-blur-sm transition hover:border-brand-500 hover:bg-brand-800"
        >
          <GearIcon className="h-5 w-5 shrink-0" />
          <span>Ajustes</span>
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 mt-2 min-w-[12.5rem] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-slate-900 shadow-xl"
          >
            <button
              type="button"
              role="menuitem"
              onClick={handleChangeGroup}
              className="w-full px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:bg-amber-50"
            >
              Volver a elegir grupo
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleLogoutClick}
              className="w-full border-t border-slate-100 px-4 py-3 text-left text-sm font-semibold text-red-700 transition hover:bg-red-50"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-confirm-title"
          onClick={handleLogoutCancel}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              id="logout-confirm-title"
              className="text-center text-base font-semibold leading-snug text-slate-800 sm:text-lg"
            >
              ¿Estás seguro de que quieres cerrar la sesión?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleLogoutConfirm}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Sí
              </button>
              <button
                type="button"
                onClick={handleLogoutCancel}
                className="flex-1 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
