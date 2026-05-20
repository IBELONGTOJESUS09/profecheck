"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AttendanceSchedule from "@/components/AttendanceSchedule";
import OptionsMenu from "@/components/OptionsMenu";
import {
  buildScheduleWithEstados,
  getCurrentDayKey,
  PreparedRow,
  refreshActiveDayEstados
} from "@/lib/schedule-4dpgm";
import { readGroup, readSession } from "@/lib/sessions";

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

    const today = getCurrentDayKey();
    setScheduleRows(buildScheduleWithEstados(today));

    if (!today) return;

    const intervalId = window.setInterval(() => {
      setScheduleRows((prev) =>
        prev.length > 0 ? refreshActiveDayEstados(prev, today) : prev
      );
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, [router]);

  return (
    <section className="space-y-6 p-4 text-brand-50 sm:p-6">
      <OptionsMenu />
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">ProfeCheck</h1>
        <p className="mt-1 text-sm text-brand-100/90">
          Asistencia semanal · 4° DPGM
        </p>
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
