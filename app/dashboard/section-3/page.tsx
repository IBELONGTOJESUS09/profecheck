"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Comunicado = {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  imagen: string;
};

const comunicados: Comunicado[] = [
  {
    id: 1,
    titulo: "Suspensión de labores",
    fecha: "01/05/2026 y 04/05/2026",
    descripcion:
      "Viernes 1 de mayo por el Día del Trabajo y lunes 4 de mayo por sustitución del 5 de mayo (Batalla de Puebla).",
    imagen: "/api/avisos/trabajo"
  },
  {
    id: 2,
    titulo: "Suspensión de labores",
    fecha: "11/05/2026",
    descripcion: "No habrá clases el lunes 11 de mayo por motivo del Día de las Madres.",
    imagen: "/api/avisos/madres"
  },
  {
    id: 3,
    titulo: "Atención comunidad estudiantil",
    fecha: "12/05/2026",
    descripcion: "Con motivo del Consejo Académico, se suspenden clases. Las oficinas permanecen en funcionamiento.",
    imagen: "/api/avisos/consejo"
  },
  {
    id: 4,
    titulo: "Suspensión de labores",
    fecha: "15/05/2026",
    descripcion: "No habrá clases el viernes 15 de mayo con motivo del Día del Maestro.",
    imagen: "/api/avisos/maestro"
  }
];

function parseFirstDate(fecha: string) {
  const match = fecha.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const [, day, month, year] = match;
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

export default function Section3Page() {
  const [selected, setSelected] = useState<Comunicado | null>(null);
  const comunicadosOrdenados = [...comunicados].sort(
    (a, b) => parseFirstDate(b.fecha) - parseFirstDate(a.fecha)
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <section className="mx-auto w-full max-w-3xl space-y-4 p-4 pb-24 text-white sm:p-6">
        <header>
          <h1 className="text-2xl font-bold sm:text-3xl">📢 Avisos escolares</h1>
          <p className="mt-1 text-sm text-zinc-300">Comunicados recientes del plantel</p>
        </header>

        <div className="space-y-3">
          {comunicadosOrdenados.map((comunicado) => (
            <article
              key={comunicado.id}
              className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">{comunicado.titulo}</h2>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                  {comunicado.fecha}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-200">{comunicado.descripcion}</p>
              <button
                type="button"
                onClick={() => setSelected(comunicado)}
                className="mt-4 block w-full overflow-hidden rounded-xl border border-white/10 transition hover:border-white/25"
                aria-label={`Abrir imagen de ${comunicado.titulo}`}
              >
                <Image
                  src={comunicado.imagen}
                  alt={`${comunicado.titulo} - ${comunicado.fecha}`}
                  width={1024}
                  height={1024}
                  className="h-auto w-full object-cover"
                  priority={comunicado.id === 1}
                />
              </button>
            </article>
          ))}
        </div>
      </section>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de aviso"
        >
          <div
            className="w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm text-zinc-200">
                {selected.titulo} · {selected.fecha}
              </p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white transition hover:bg-white/20"
              >
                Cerrar
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-zinc-900">
              <Image
                src={selected.imagen}
                alt={`${selected.titulo} - ${selected.fecha}`}
                width={1024}
                height={1024}
                className="h-auto max-h-[80vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
