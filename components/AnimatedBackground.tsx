export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-[#421424] to-[#1e0a12]" />
      <div className="absolute -left-24 top-[-8rem] h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -right-16 bottom-[-6rem] h-80 w-80 rounded-full bg-rose-400/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:26px_26px] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}
