"use client";

import { useState } from "react";
import {
  DayKey,
  DAYS,
  estadoBadgeClasses,
  PreparedRow,
  subjectCellClasses
} from "@/lib/schedule-4dpgm";

type Props = {
  rows: PreparedRow[];
};

export default function AttendanceSchedule({ rows }: Props) {
  const [selectedDay, setSelectedDay] = useState<DayKey>("lunes");
  const selectedDayLabel =
    DAYS.find((d) => d.key === selectedDay)?.label ?? "Lunes";

  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-white text-slate-900 shadow-2xl">
      <div className="border-b-2 border-amber-300 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 px-4 py-4 sm:px-6 sm:py-5">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-950">
          Control de asistencia
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
          Horario de grupo
        </h2>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-800 sm:text-base">
          <span>
            <span className="font-bold text-slate-900">Turno:</span> Vespertino
          </span>
          <span>
            <span className="font-bold text-slate-900">Plantel:</span> Villa del Sol
          </span>
          <span>
            <span className="font-bold text-slate-900">Semestre:</span> 2026-1 (Feb – Jun 2026)
          </span>
          <span>
            <span className="font-bold text-slate-900">Grupo:</span> 4° DPGM
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-3 py-3 text-sm sm:text-base">
          <span className="font-bold text-slate-800">Leyenda de asistencia:</span>
          <span className="inline-flex items-center rounded-full bg-green-600 px-3 py-1.5 text-sm font-bold text-white shadow">
            Presente
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-500 px-3 py-1.5 text-sm font-bold text-white shadow">
            Retardo
          </span>
          <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1.5 text-sm font-bold text-white shadow">
            Ausente
          </span>
          <span className="text-slate-600">
            (Asignación aleatoria al cargar: 80% / 8% / 12%)
          </span>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-bold text-slate-800 sm:text-base">
            Selecciona el día:
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Días de la semana"
          >
            {DAYS.map((d) => {
              const isActive = selectedDay === d.key;
              return (
                <button
                  key={d.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedDay(d.key)}
                  className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition sm:px-5 sm:text-base ${
                    isActive
                      ? "border-amber-700 bg-amber-500 text-white shadow-md"
                      : "border-slate-300 bg-white text-slate-800 hover:border-amber-400 hover:bg-amber-50"
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-slate-100 p-2 sm:p-3">
        <table className="w-full min-w-[420px] border-separate border-spacing-1.5 text-left sm:min-w-[520px]">
          <thead>
            <tr>
              <th
                scope="col"
                className="w-36 rounded-lg border-2 border-amber-600 bg-amber-300 px-3 py-4 text-center text-sm font-extrabold uppercase tracking-wide text-slate-900 shadow-md sm:w-40 sm:text-base"
              >
                Horario
              </th>
              <th
                scope="col"
                className="rounded-lg border-2 border-amber-600 bg-amber-300 px-3 py-4 text-center text-sm font-extrabold uppercase tracking-wide text-slate-900 shadow-md sm:text-base"
              >
                {selectedDayLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) =>
              row.kind === "receso" ? (
                <tr key={`receso-${idx}`}>
                  <td className="rounded-lg border-2 border-slate-500 bg-slate-400 px-3 py-3 text-center text-sm font-extrabold uppercase text-slate-900 shadow-md sm:text-base">
                    {row.horario}
                  </td>
                  <td className="rounded-lg border-2 border-slate-500 bg-slate-300 px-4 py-3 text-center text-base font-extrabold uppercase tracking-[0.25em] text-slate-800 shadow-md">
                    {row.label}
                  </td>
                </tr>
              ) : (
                <tr key={`lesson-${row.horario}-${idx}`}>
                  <td className="rounded-lg border-2 border-slate-400 bg-white px-3 py-4 text-center text-sm font-bold leading-tight text-slate-900 shadow-md sm:text-base">
                    {row.horario}
                  </td>
                  {(() => {
                    const cell = row.byDay[selectedDay];
                    const palette = subjectCellClasses(cell.materia);
                    const isQuimica = cell.materia
                      .toLowerCase()
                      .includes("reacciones químicas");
                    return (
                      <td className={`rounded-lg p-3 sm:p-4 ${palette}`}>
                        <div className="flex min-h-[4.5rem] flex-col justify-between gap-3">
                          <p
                            className={`text-sm font-bold leading-snug sm:text-[15px] sm:leading-snug ${
                              isQuimica ? "text-white" : ""
                            }`}
                          >
                            {cell.materia}
                          </p>
                          <div className="flex justify-center">
                            <span
                              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide shadow-md sm:text-sm ${estadoBadgeClasses(cell.estado)}`}
                            >
                              {cell.estado}
                            </span>
                          </div>
                        </div>
                      </td>
                    );
                  })()}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <p className="border-t-2 border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-600 sm:px-6">
        Mostrando materias de <span className="font-bold">{selectedDayLabel}</span>.
        Los estados se generan al azar en cada carga de página.
      </p>
    </div>
  );
}