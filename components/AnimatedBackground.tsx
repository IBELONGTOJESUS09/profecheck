export default function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="cecyte-bg-overlay absolute inset-0" />
      <div className="cecyte-bg-layer cecyte-bg-layer--1" />
      <div className="cecyte-bg-layer cecyte-bg-layer--2" />
      <div className="cecyte-bg-layer cecyte-bg-layer--3" />
    </div>
  );
}
