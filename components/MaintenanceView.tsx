type Props = {
  title: string;
  message: string;
};

export default function MaintenanceView({ title, message }: Props) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/30 p-8 text-center shadow-2xl backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
        <p className="mt-4 text-lg font-medium text-zinc-200">{message}</p>
      </div>
    </section>
  );
}
