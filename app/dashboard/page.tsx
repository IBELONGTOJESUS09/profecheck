"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AttendanceSchedule from "@/components/AttendanceSchedule";
import { buildScheduleWithEstados, PreparedRow } from "@/lib/schedule-4dpgm";
import { clearSession, readGroup, readSession } from "@/lib/sessions";

export default function DashboardPage() {
  const router = useRouter();
  const [scheduleRows, setScheduleRows] = useState<PreparedRow[]>([]);

  useEffect(() => {
    const session = readSession();

    if (!session) {
      router.push("/login");
      return;
    }

    if (readGroup() !== "4DPGM") {
      router.push("/group-select");
      return;
    }

    setScheduleRows(buildScheduleWithEstados());
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <section className="space-y-6 p-4 text-brand-50 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">ProfeCheck</h1>
          <p className="mt-1 text-sm text-brand-100/90">
            Asistencia semanal · 4° DPGM
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md"
        >
          Cerrar sesión
        </button>
      </div>

      {scheduleRows.length > 0 ? (
        <AttendanceSchedule rows={scheduleRows} />
      ) : (
        <div className="rounded-2xl border border-brand-700/40 bg-brand-900/40 px-6 py-10 text-center text-brand-100">
          Cargando horario…
        </div>
      )}
    </section>
  );
}
