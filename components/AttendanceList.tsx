"use client";

import { useMemo, useState } from "react";

type Estado = "Presente" | "Tarde" | "Ausente";

type StudentAttendance = {
  id: number;
  name: string;
  estado: Estado;
};

const initialStudents: StudentAttendance[] = [
  { id: 1, name: "Ana Lopez", estado: "Presente" },
  { id: 2, name: "Luis Garcia", estado: "Presente" },
  { id: 3, name: "Mia Hernandez", estado: "Tarde" },
  { id: 4, name: "Carlos Perez", estado: "Ausente" }
];

const estadoStyles: Record<Estado, string> = {
  Presente: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
  Tarde: "bg-amber-500/20 text-amber-200 border-amber-400/40",
  Ausente: "bg-rose-500/20 text-rose-200 border-rose-400/40"
};

export default function AttendanceList() {
  const [students, setStudents] = useState<StudentAttendance[]>(initialStudents);

  const summary = useMemo(() => {
    return students.reduce(
      (acc, student) => {
        acc[student.estado] += 1;
        return acc;
      },
      { Presente: 0, Tarde: 0, Ausente: 0 } as Record<Estado, number>
    );
  }, [students]);

  const updateEstado = (id: number, estado: Estado) => {
    setStudents((prev) => prev.map((student) => (student.id === id ? { ...student, estado } : student)));
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f0f0f]/70 p-4 text-white shadow-2xl backdrop-blur-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Lista de asistencia</h2>
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1">
            Presente: {summary.Presente}
          </span>
          <span className="rounded-full border border-amber-400/40 bg-amber-500/20 px-3 py-1">
            Tarde: {summary.Tarde}
          </span>
          <span className="rounded-full border border-rose-400/40 bg-rose-500/20 px-3 py-1">
            Ausente: {summary.Ausente}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className={`rounded-full border px-2.5 py-1 text-xs ${estadoStyles[student.estado]}`}>
                {student.estado}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => updateEstado(student.id, "Presente")}
                className="rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-600"
              >
                Presente
              </button>
              <button
                type="button"
                onClick={() => updateEstado(student.id, "Tarde")}
                className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-amber-600"
              >
                Tarde
              </button>
              <button
                type="button"
                onClick={() => updateEstado(student.id, "Ausente")}
                className="rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-600"
              >
                Ausente
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
