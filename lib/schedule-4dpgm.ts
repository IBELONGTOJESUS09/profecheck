export type DayKey = "lunes" | "martes" | "miercoles" | "jueves" | "viernes";

export const DAYS: { key: DayKey; label: string }[] = [
  { key: "lunes", label: "Lunes" },
  { key: "martes", label: "Martes" },
  { key: "miercoles", label: "Miércoles" },
  { key: "jueves", label: "Jueves" },
  { key: "viernes", label: "Viernes" }
];

export type AsistenciaEstado = "Presente" | "Retardo" | "Ausente";

/** Probabilidades exactas: Presente 80%, Retardo 8%, Ausente 12% */
export function rollEstado(): AsistenciaEstado {
  const r = Math.random();
  if (r < 0.8) return "Presente";
  if (r < 0.88) return "Retardo";
  return "Ausente";
}

export type LessonCell = {
  materia: string;
  maestro: string;
};

export type LessonRow = {
  kind: "lesson";
  horario: string;
  byDay: Record<DayKey, LessonCell>;
};

export type RecesoRow = {
  kind: "receso";
  horario: string;
  label: string;
};

export type ScheduleRow = LessonRow | RecesoRow;

/** Horario vespertino 4° DPGM — plantel Villa del Sol, semestre 2026-1 (imagen de referencia) */
export const SCHEDULE_ROWS: ScheduleRow[] = [
  {
    kind: "lesson",
    horario: "13:30 – 14:20",
    byDay: {
      lunes: {
        materia: "Implementa bases de datos no relacionales en un sistema de información",
        maestro: "Martínez Cervantes Gerardo"
      },
      martes: {
        materia: "Temas selectos de matemáticas I",
        maestro: "Beltrán Castillón Hugo Alberto"
      },
      miercoles: {
        materia: "Temas selectos de matemáticas I",
        maestro: "Beltrán Castillón Hugo Alberto"
      },
      jueves: {
        materia: "Implementa bases de datos no relacionales en un sistema de información",
        maestro: "Martínez Cervantes Gerardo"
      },
      viernes: {
        materia: "Implementa bases de datos relacionales en un sistema de información",
        maestro: "Pazos López Jorge Adán"
      }
    }
  },
  {
    kind: "lesson",
    horario: "14:20 – 15:10",
    byDay: {
      lunes: { materia: "Inglés IV", maestro: "Quinto Parra Víctor Daniel" },
      martes: {
        materia: "Implementa bases de datos relacionales en un sistema de información",
        maestro: "Pazos López Jorge Adán"
      },
      miercoles: {
        materia: "Implementa bases de datos relacionales en un sistema de información",
        maestro: "Pazos López Jorge Adán"
      },
      jueves: {
        materia: "Implementa bases de datos no relacionales en un sistema de información",
        maestro: "Martínez Cervantes Gerardo"
      },
      viernes: { materia: "Inglés IV", maestro: "Quinto Parra Víctor Daniel" }
    }
  },
  {
    kind: "lesson",
    horario: "15:10 – 16:00",
    byDay: {
      lunes: {
        materia: "Temas selectos de matemáticas I",
        maestro: "Beltrán Castillón Hugo Alberto"
      },
      martes: { materia: "Inglés IV", maestro: "Quinto Parra Víctor Daniel" },
      miercoles: { materia: "Ciencias Sociales III", maestro: "Salgado Ferrara Oracel" },
      jueves: {
        materia: "Conciencia histórica I. Perspectivas del México antiguo en los contextos globales",
        maestro: "Herrera Cázarez Minerva"
      },
      viernes: {
        materia: "Implementa bases de datos no relacionales en un sistema de información",
        maestro: "Martínez Cervantes Gerardo"
      }
    }
  },
  {
    kind: "receso",
    horario: "16:00 – 16:30",
    label: "RECESO"
  },
  {
    kind: "lesson",
    horario: "16:30 – 17:20",
    byDay: {
      lunes: {
        materia: "Implementa bases de datos relacionales en un sistema de información",
        maestro: "Pazos López Jorge Adán"
      },
      martes: { materia: "Ciencias Sociales III", maestro: "Salgado Ferrara Oracel" },
      miercoles: {
        materia: "Implementa bases de datos relacionales en un sistema de información",
        maestro: "Pazos López Jorge Adán"
      },
      jueves: {
        materia: "Implementa bases de datos relacionales en un sistema de información",
        maestro: "Pazos López Jorge Adán"
      },
      viernes: {
        materia: "Temas selectos de matemáticas I",
        maestro: "Beltrán Castillón Hugo Alberto"
      }
    }
  },
  {
    kind: "lesson",
    horario: "17:20 – 18:10",
    byDay: {
      lunes: {
        materia: "Implementa bases de datos no relacionales en un sistema de información",
        maestro: "Martínez Cervantes Gerardo"
      },
      martes: {
        materia: "Implementa bases de datos relacionales en un sistema de información",
        maestro: "Pazos López Jorge Adán"
      },
      miercoles: {
        materia: "Reacciones químicas: conservación de la materia en la formación de nuevas sustancias",
        maestro: "Zapata Céspedes Karina del Carmen"
      },
      jueves: {
        materia: "Implementa bases de datos no relacionales en un sistema de información",
        maestro: "Martínez Cervantes Gerardo"
      },
      viernes: {
        materia: "Reacciones químicas: conservación de la materia en la formación de nuevas sustancias",
        maestro: "Zapata Céspedes Karina del Carmen"
      }
    }
  },
  {
    kind: "lesson",
    horario: "18:10 – 19:00",
    byDay: {
      lunes: {
        materia: "Reacciones químicas: conservación de la materia en la formación de nuevas sustancias",
        maestro: "Zapata Céspedes Karina del Carmen"
      },
      martes: {
        materia: "Reacciones químicas: conservación de la materia en la formación de nuevas sustancias",
        maestro: "Zapata Céspedes Karina del Carmen"
      },
      miercoles: {
        materia: "Implementa bases de datos no relacionales en un sistema de información",
        maestro: "Martínez Cervantes Gerardo"
      },
      jueves: {
        materia: "Implementa bases de datos relacionales en un sistema de información",
        maestro: "Pazos López Jorge Adán"
      },
      viernes: {
        materia: "Conciencia histórica I. Perspectivas del México antiguo en los contextos globales",
        maestro: "Herrera Cázarez Minerva"
      }
    }
  },
  {
    kind: "lesson",
    horario: "19:00 – 19:50",
    byDay: {
      lunes: {
        materia: "Implementa bases de datos relacionales en un sistema de información",
        maestro: "Leyva Montoya Gerardo"
      },
      martes: { materia: "Cine club", maestro: "—" },
      miercoles: {
        materia: "Conciencia histórica I. Perspectivas del México antiguo en los contextos globales",
        maestro: "Herrera Cázarez Minerva"
      },
      jueves: {
        materia: "Implementa bases de datos relacionales en un sistema de información",
        maestro: "Leyva Montoya Gerardo"
      },
      viernes: { materia: "Cine club", maestro: "—" }
    }
  }
];

/** Colores de celda por tipo de materia — alto contraste para lectura rápida */
export function subjectCellClasses(materia: string): string {
  const m = materia.toLowerCase();
  if (m.includes("cine club")) {
    return "border-2 border-sky-500 bg-sky-200 text-sky-950 shadow-sm";
  }
  if (m.includes("no relacionales")) {
    return "border-2 border-emerald-600 bg-emerald-200 text-emerald-950 shadow-sm";
  }
  if (m.includes("relacionales")) {
    return "border-2 border-orange-500 bg-orange-200 text-orange-950 shadow-sm";
  }
  if (m.includes("matemáticas")) {
    return "border-2 border-amber-600 bg-amber-200 text-amber-950 shadow-sm";
  }
  if (m.includes("inglés")) {
    return "border-2 border-yellow-600 bg-yellow-200 text-yellow-950 shadow-sm";
  }
  if (m.includes("ciencias sociales")) {
    return "border-2 border-blue-500 bg-blue-200 text-blue-950 shadow-sm";
  }
  if (m.includes("reacciones químicas")) {
    return "border-2 border-green-800 bg-green-700 text-white shadow-sm";
  }
  if (m.includes("conciencia histórica")) {
    return "border-2 border-teal-600 bg-teal-200 text-teal-950 shadow-sm";
  }
  return "border-2 border-slate-400 bg-slate-200 text-slate-900 shadow-sm";
}

export function estadoBadgeClasses(estado: AsistenciaEstado): string {
  switch (estado) {
    case "Presente":
      return "bg-green-600 text-white ring-1 ring-green-700/40";
    case "Retardo":
      return "bg-amber-500 text-white ring-1 ring-amber-600/50";
    case "Ausente":
      return "bg-red-600 text-white ring-1 ring-red-800/40";
    default:
      return "bg-slate-600 text-white";
  }
}

export type CellWithEstado = LessonCell & { estado: AsistenciaEstado };

export type PreparedLessonRow = {
  kind: "lesson";
  horario: string;
  byDay: Record<DayKey, CellWithEstado>;
};

export type PreparedRow = PreparedLessonRow | RecesoRow;

export function buildScheduleWithEstados(): PreparedRow[] {
  return SCHEDULE_ROWS.map((row) => {
    if (row.kind === "receso") return row;
    const byDay = {} as Record<DayKey, CellWithEstado>;
    for (const d of DAYS) {
      const c = row.byDay[d.key];
      byDay[d.key] = { ...c, estado: rollEstado() };
    }
    return { kind: "lesson", horario: row.horario, byDay };
  });
}
