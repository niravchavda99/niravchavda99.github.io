export default function FullPageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
      </div>
      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
        loading...
      </span>
    </div>
  );
}
