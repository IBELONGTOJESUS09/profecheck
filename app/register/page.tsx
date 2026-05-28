"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supaClient";
import { limitPhoneDigits, normalizeInput } from "@/lib/validators";

function limitMatriculaDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 14);
}

export default function RegisterPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [prefijo, setPrefijo] = useState("+52");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const tel = limitPhoneDigits(telefono);
    const cleanEmail = email ? limitMatriculaDigits(normalizeInput(email)) : null;
    const fullPhone = tel ? `${prefijo}${tel}` : null;

    let existing: any = null;
    let queryError: any = null;

    // 🔍 validar por email
    if (cleanEmail) {
      const res = await supabase
        .from("users")
        .select("*")
        .eq("email", cleanEmail)
        .maybeSingle();

      if (res.error) queryError = res.error;
      if (res.data) existing = res.data;
    }

    // 🔍 validar por telefono
    if (!existing && fullPhone) {
      const res = await supabase
        .from("users")
        .select("*")
        .eq("telefono", fullPhone)
        .maybeSingle();

      if (res.error) queryError = res.error;
      if (res.data) existing = res.data;
    }

    if (queryError) {
      console.log("ERROR VALIDANDO:", JSON.stringify(queryError, null, 2));
      setError("Error validando usuario");
      return;
    }

    if (existing) {
      setError("Ya existe una cuenta con esa matrícula o teléfono.");
      return;
    }

    // ✅ insertar usuario (CORREGIDO)
    const { error: insertError } = await supabase.from("users").insert([
      {
        nombre: nombre.trim(),
        email: cleanEmail,
        telefono: fullPhone,
        password
      }
    ]);

    if (insertError) {
      console.log("ERROR INSERTANDO:", JSON.stringify(insertError, null, 2));
      setError("Error al crear usuario");
      return;
    }

    router.push("/login");
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center">
      <form className="card space-y-4" onSubmit={onSubmit}>
        <h1 className="text-3xl font-bold text-brand-800">Crear cuenta</h1>

        <label className="block text-sm font-medium">
          Nombre
          <input
            className="input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label className="block text-sm font-medium">
          Matrícula
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(limitMatriculaDigits(e.target.value))}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={14}
          />
        </label>

        <div className="grid grid-cols-3 gap-2">
          <input
            className="input"
            value={prefijo}
            onChange={(e) => setPrefijo(e.target.value)}
          />
          <input
            className="input col-span-2"
            value={telefono}
            onChange={(e) => setTelefono(limitPhoneDigits(e.target.value))}
            maxLength={10}
            placeholder="Telefono"
          />
        </div>

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

        <label className="block text-sm font-medium">
          Confirmar contraseña
          <input
            className="input"
            type="password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button className="btn-primary w-full" type="submit">
          Crear cuenta
        </button>

        <Link href="/login" className="block text-center text-sm text-brand-700">
          Ya tengo cuenta
        </Link>
      </form>
    </section>
  );
}