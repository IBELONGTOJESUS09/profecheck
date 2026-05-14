import {
  DAYS,
  estadoBadgeClasses,
  PreparedRow,
  subjectCellClasses
} from "@/lib/schedule-4dpgm";

type Props = {
  rows: PreparedRow[];
};

export default function AttendanceSchedule({ rows }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white text-slate-900 shadow-xl ring-1 ring-slate-900/5">
      <div className="border-b border-slate-200 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 px-4 py-4 sm:px-6 sm:py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">
          Control de asistencia
        </p>
        <h2 className="mt-1 font-serif text-xl font-bold text-slate-900 sm:text-2xl">
          Horario de grupo
        </h2>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
          <span>
            <span className="font-semibold text-slate-600">Turno:</span> Vespertino
          </span>
          <span>
            <span className="font-semibold text-slate-600">Plantel:</span> Villa del Sol
          </span>
          <span>
            <span className="font-semibold text-slate-600">Semestre:</span> 2026-1 (Feb – Jun 2026)
          </span>
          <span>
            <span className="font-semibold text-slate-600">Grupo:</span> 4° DPGM
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2.5 text-xs sm:text-sm">
          <span className="font-semibold text-slate-600">Leyenda de asistencia:</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-2.5 py-1 font-medium text-white">
            Presente
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-2.5 py-1 font-medium text-white">
            Retardo
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 font-medium text-white">
            Ausente
          </span>
          <span className="text-slate-500">
            (Asignación aleatoria al cargar: 80% / 8% / 12%)
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gradient-to-b from-amber-200/90 to-amber-100/95 text-slate-900">
              <th
                scope="col"
                className="sticky left-0 z-20 w-[7.5rem] border border-amber-300/80 bg-gradient-to-b from-amber-200 to-amber-100 px-2 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-800 shadow-[2px_0_8px_rgba(0,0,0,0.06)] sm:w-36 sm:px-3 sm:text-sm"
              >
                Horario
              </th>
              {DAYS.map((d) => (
                <th
                  key={d.key}
                  scope="col"
                  className="border border-amber-300/70 px-2 py-3 text-center text-xs font-bold uppercase tracking-wide sm:px-3 sm:text-sm"
                >
                  {d.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) =>
              row.kind === "receso" ? (
                <tr key={`receso-${idx}`} className="bg-slate-200/90">
                  <td className="sticky left-0 z-10 border border-slate-300 bg-slate-300 px-2 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-slate-800 sm:text-sm">
                    {row.horario}
                  </td>
                  <td
                    colSpan={5}
                    className="border border-slate-300 px-3 py-2.5 text-center text-sm font-bold uppercase tracking-[0.2em] text-slate-700"
                  >
                    {row.label}
                  </td>
                </tr>
              ) : (
                <tr key={`lesson-${row.horario}-${idx}`} className="align-top">
                  <td className="sticky left-0 z-10 border border-slate-300 bg-slate-100 px-2 py-3 text-center text-xs font-semibold text-slate-800 shadow-[2px_0_8px_rgba(0,0,0,0.05)] sm:text-sm">
                    {row.horario}
                  </td>
                  {DAYS.map((d) => {
                    const cell = row.byDay[d.key];
                    const palette = subjectCellClasses(cell.materia);
                    return (
                      <td
                        key={d.key}
                        className={`border p-2 sm:p-3 ${palette}`}
                      >
                        <div className="flex min-h-[5.5rem] flex-col justify-between gap-2">
                          <div>
                            <p className="text-[11px] font-semibold leading-snug sm:text-xs">
                              {cell.materia}
                            </p>
                            <p
                              className={`mt-1.5 text-[10px] font-medium leading-tight sm:text-[11px] ${
                                cell.materia.toLowerCase().includes("reacciones químicas")
                                  ? "text-green-100/95"
                                  : "text-slate-700/90"
                              }`}
                            >
                              {cell.maestro}
                            </p>
                          </div>
                          <div className="flex justify-center sm:justify-end">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm sm:text-xs ${estadoBadgeClasses(cell.estado)}`}
                            >
                              {cell.estado}
                            </span>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <p className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs text-slate-500 sm:px-6">
        Los estados se generan al azar en cada carga de página según la distribución indicada.
      </p>
    </div>
  );
}
