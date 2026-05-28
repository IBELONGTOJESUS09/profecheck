"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supaClient";
import { saveSession } from "@/lib/sessions";
import { limitPhoneDigits, normalizeInput } from "@/lib/validators";
import { UserRow } from "@/lib/types";

function limitMatriculaDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 14);
}

export default function LoginPage() {
  const router = useRouter();
  const [identificador, setIdentificador] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const matricula = limitMatriculaDigits(normalizeInput(identificador));
      const { data, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("email", matricula)
        .limit(1)
        .maybeSingle();

      // ❌ Usuario no existe
      if (queryError || !data) {
        setError("Usuario no encontrado.");
        setLoading(false);
        return;
      }

      // 🔐 VALIDAR PASSWORD
      if (data.password !== password) {
        setError("Contraseña incorrecta.");
        setLoading(false);
        return;
      }

      // ✅ LOGIN CORRECTO
      saveSession(data.id);
      router.push("/dashboard/section-3");

    } catch (err) {
      console.error(err);
      setError("Error inesperado. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center">
      <form className="card space-y-4" onSubmit={onSubmit}>
        <h1 className="text-3xl font-bold text-brand-800">ProfeCheck</h1>
        <p className="text-sm text-slate-500">
          Inicia sesión con tu matrícula.
        </p>

        <label className="block text-sm font-medium">
          Matrícula
          <input
            className="input"
            value={identificador}
            onChange={(e) => setIdentificador(limitMatriculaDigits(e.target.value))}
            placeholder="123456"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={14}
            required
          />
        </label>

        <label className="block text-sm font-medium">
          Contraseña
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && (
          <p className="text-sm font-medium text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>

        <div className="flex justify-between text-sm">
          <Link href="/register" className="text-brand-700 hover:underline">
            Crear cuenta
          </Link>
          <Link href="/recover" className="text-brand-700 hover:underline">
            Recuperar contraseña
          </Link>
        </div>
      </form>
    </section>
  );
}