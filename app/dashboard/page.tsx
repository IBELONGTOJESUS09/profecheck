"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supaClient";
import { clearSession, readGroup, readSession } from "@/lib/sessions";
import { AsistenciaRow } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();

  const [rows, setRows] = useState<AsistenciaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ➕ formulario
  const [hora, setHora] = useState("");
  const [numeroEmpleado, setNumeroEmpleado] = useState("");
  const [maestro, setMaestro] = useState("");
  const [materia, setMateria] = useState("");
  const [estado, setEstado] = useState("Presente");

  // ✏️ edición
  const [editId, setEditId] = useState<string | null>(null);

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

    // 🧪 TEST DE CONEXIÓN (IMPORTANTE)
    const test = async () => {
      const { data, error } = await supabase.from("asistencia").select("*");
      console.log("DATA:", data);
      console.log("ERROR:", error);
    };

    test();

    loadRows();
  }, []);

  const loadRows = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("asistencia")
      .select("*")
      .order("hora");

    if (error) {
      console.error(error);
      setError("Error cargando datos");
    } else {
      setRows(data as AsistenciaRow[]);
    }

    setLoading(false);
  };

  // ➕ agregar
  const agregarRegistro = async () => {
    if (!hora || !numeroEmpleado || !maestro || !materia) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const { error } = await supabase.from("asistencia").insert([
      {
        hora,
        numero_empleado: numeroEmpleado,
        maestro,
        materia,
        estado
      }
    ]);

    if (error) {
      console.error(error);
      setError("Error al agregar");
      return;
    }

    limpiarFormulario();
    loadRows();
  };

  // ❌ eliminar
  const eliminarRegistro = async (id: string) => {
    const { error } = await supabase.from("asistencia").delete().eq("id", id);

    if (error) {
      console.error(error);
      setError("Error al eliminar");
      return;
    }

    loadRows();
  };

  // ✏️ editar
  const editarRegistro = (row: AsistenciaRow) => {
    setEditId(row.id);
    setHora(row.hora);
    setNumeroEmpleado(row.numero_empleado);
    setMaestro(row.maestro);
    setMateria(row.materia);
    setEstado(row.estado);
  };

  // 💾 guardar edición
  const guardarEdicion = async () => {
    if (!editId) return;

    const { error } = await supabase
      .from("asistencia")
      .update({
        hora,
        numero_empleado: numeroEmpleado,
        maestro,
        materia,
        estado
      })
      .eq("id", editId);

    if (error) {
      console.error(error);
      setError("Error al actualizar");
      return;
    }

    setEditId(null);
    limpiarFormulario();
    loadRows();
  };

  const limpiarFormulario = () => {
    setHora("");
    setNumeroEmpleado("");
    setMaestro("");
    setMateria("");
    setEstado("Presente");
  };

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <section className="space-y-6 p-6 text-brand-50">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-white">ProfeCheck</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
          Cerrar sesión
        </button>
      </div>

      {/* FORMULARIO */}
      <div className="space-y-2 rounded bg-white p-4 text-slate-800 shadow">
        <h2>{editId ? "Editar" : "Agregar"} asistencia</h2>

        <input className="input" placeholder="Hora" value={hora} onChange={(e) => setHora(e.target.value)} />
        <input className="input" placeholder="Empleado" value={numeroEmpleado} onChange={(e) => setNumeroEmpleado(e.target.value)} />
        <input className="input" placeholder="Maestro" value={maestro} onChange={(e) => setMaestro(e.target.value)} />
        <input className="input" placeholder="Materia" value={materia} onChange={(e) => setMateria(e.target.value)} />

        <select className="input" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option>Presente</option>
          <option>Ausente</option>
          <option>Retardo</option>
        </select>

        {editId ? (
          <button onClick={guardarEdicion} className="bg-brand-700 text-white px-3 py-1 rounded hover:bg-brand-800">
            Guardar cambios
          </button>
        ) : (
          <button onClick={agregarRegistro} className="bg-brand-600 text-white px-3 py-1 rounded hover:bg-brand-700">
            Agregar
          </button>
        )}
      </div>

      {/* TABLA */}
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="w-full rounded bg-white text-slate-800 shadow">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Empleado</th>
              <th>Maestro</th>
              <th>Materia</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.hora}</td>
                <td>{row.numero_empleado}</td>
                <td>{row.maestro}</td>
                <td>{row.materia}</td>
                <td>{row.estado}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => editarRegistro(row)}
                    className="bg-brand-500 text-white px-2 py-1 rounded hover:bg-brand-600"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => eliminarRegistro(row.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}