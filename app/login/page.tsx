"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supaClient";
import { saveSession } from "@/lib/sessions";
import { limitPhoneDigits, normalizeInput } from "@/lib/validators";
import { UserRow } from "@/lib/types";

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
      const input = normalizeInput(identificador);
      const telefono = limitPhoneDigits(input);
      const looksLikePhone = telefono.length >= 7;

      // 🔍 BUSCAR USUARIO (SIN PASSWORD)
      let query = supabase.from("users").select("*").limit(1);

      query = looksLikePhone
        ? query.or(`telefono.ilike.%${telefono},correo.eq.${input},nombre.eq.${input}`)
        : query.or(`correo.eq.${input},nombre.eq.${input}`);

      const { data, error: queryError } = await query.maybeSingle<UserRow>();

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
      router.push("/dashboard");

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
          Inicia sesión con nombre, correo o teléfono.
        </p>

        <label className="block text-sm font-medium">
          Nombre, correo o teléfono
          <input
            className="input"
            value={identificador}
            onChange={(e) => setIdentificador(e.target.value)}
            placeholder="usuario@correo.com o +52..."
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