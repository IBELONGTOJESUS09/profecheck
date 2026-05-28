"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supaClient";
import { normalizeInput } from "@/lib/validators";

type VerificationState = {
  correct: number;
  options: number[];
} | null;

export default function RecoverPage() {
  const router = useRouter();
  const [target, setTarget] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verification, setVerification] = useState<VerificationState>(null);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const sendCode = () => {
    const correct = Math.floor(100 + Math.random() * 900);
    const fake = new Set<number>([correct]);
    while (fake.size < 3) fake.add(Math.floor(100 + Math.random() * 900));
    setVerification({ correct, options: Array.from(fake).sort(() => Math.random() - 0.5) });
    setInfo("Codigo simulado enviado. Selecciona la opcion correcta.");
  };

  const onStart = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (newPassword !== confirmPassword) {
      setError("Las contrasenas no coinciden.");
      return;
    }
    sendCode();
  };

  const onVerify = async (choice: number) => {
    if (!verification) return;
    if (choice !== verification.correct) {
      setError("Codigo incorrecto.");
      return;
    }

    const input = normalizeInput(target);
    const digits = input.replace(/\D/g, "");
    const condition = digits.length >= 7 ? `correo.eq.${input},telefono.ilike.%${digits}` : `correo.eq.${input},telefono.eq.${input}`;

    const { error: updateError } = await supabase
      .from("users")
      .update({ contrasena: newPassword })
      .or(condition);

    if (updateError) {
      setError("No fue posible actualizar la contrasena.");
      return;
    }

    router.push("/login");
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center">
      <form className="card space-y-4" onSubmit={onStart}>
        <h1 className="text-3xl font-bold text-brand-800">Recuperar contrasena</h1>
        <p className="text-sm text-slate-500">Usa matrícula o teléfono para restablecer acceso.</p>

        <label className="block text-sm font-medium">
          Matrícula o teléfono
          <input className="input" value={target} onChange={(e) => setTarget(e.target.value)} required />
        </label>

        <label className="block text-sm font-medium">
          Nueva contrasena
          <input
            className="input"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>

        <label className="block text-sm font-medium">
          Confirmar contrasena
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {info && <p className="text-sm font-medium text-brand-700">{info}</p>}

        {!verification ? (
          <button className="btn-primary w-full" type="submit">
            Enviar codigo simulado
          </button>
        ) : (
          <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-medium text-slate-700">Selecciona el codigo correcto:</p>
            <div className="grid grid-cols-3 gap-2">
              {verification.options.map((option) => (
                <button type="button" key={option} className="btn-secondary" onClick={() => onVerify(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <Link href="/login" className="block text-center text-sm text-brand-700 hover:underline">
          Volver al login
        </Link>
      </form>
    </section>
  );
}
