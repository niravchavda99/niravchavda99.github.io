import Link from "next/link";

export default function CustomNotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="text-center max-w-md">
        <div className="font-mono text-xs text-slate-400 dark:text-slate-500 mb-6 flex items-center justify-center gap-2">
          <span className="text-cyan-400/60">//</span>
          error
        </div>

        <h1 className="text-8xl sm:text-9xl font-bold font-mono mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Page not found
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-10 font-mono">
          <span className="text-red-400">Error:</span> The requested route does
          not exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
