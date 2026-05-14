"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PROFECHECK_GROUPS, ProfeCheckGroup, readSession, saveGroup } from "@/lib/sessions";

export default function GroupSelectPage() {
  const router = useRouter();
  const [fueraDeServicio, setFueraDeServicio] = useState(false);

  useEffect(() => {
    if (!readSession()) {
      router.replace("/login");
    }
  }, [router]);

  const onElegir = (grupo: ProfeCheckGroup) => {
    setFueraDeServicio(false);
    if (grupo === "4DPGM") {
      saveGroup(grupo);
      router.push("/dashboard");
      return;
    }
    setFueraDeServicio(true);
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center">
      <div className="card space-y-4">
        <h1 className="text-2xl font-bold text-brand-800">Selecciona tu grupo</h1>
        <p className="text-sm text-slate-500">Elige una opción para continuar.</p>

        <div className="grid grid-cols-2 gap-3">
          {PROFECHECK_GROUPS.map((grupo) => (
            <button
              key={grupo}
              type="button"
              className="btn-primary w-full py-3"
              onClick={() => onElegir(grupo)}
            >
              {grupo}
            </button>
          ))}
        </div>

        {fueraDeServicio && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-center text-sm font-medium text-amber-900">
            Fuera de servicio
          </p>
        )}
      </div>
    </section>
  );
}
