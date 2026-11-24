export default function FullPageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      <div className="relative w-10 h-10 border border-border bg-card flex items-center justify-center">
        <span className="w-2 h-2 bg-primary animate-ping" />
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        Loading workspace
      </span>
    </div>
  );
}
