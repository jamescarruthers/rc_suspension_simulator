function App() {
  return (
    <main className="min-h-screen bg-bg text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-6 px-6 py-16">
        <p className="font-ui text-sm uppercase tracking-[0.2em] text-grid">RC Suspension Simulator</p>
        <h1 className="font-heading text-4xl font-semibold text-primary sm:text-5xl">
          Vite + React + TypeScript baseline
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          Project scaffold includes Three.js, React Three Fiber, Zustand, Recharts, and TailwindCSS.
        </p>
        <div className="font-ui text-sm text-secondary">
          Theme tokens are configured for a dark engineering dashboard aesthetic.
        </div>
      </div>
    </main>
  )
}

export default App
