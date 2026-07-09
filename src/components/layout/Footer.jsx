const CONTAINER = "mx-auto max-w-6xl px-5 sm:px-8";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/90 dark:border-slate-800">
      <div className={`${CONTAINER} flex flex-col items-center justify-between gap-3 py-7 text-xs text-slate-500 dark:text-slate-400 sm:flex-row`}>
        <span className="font-mono">© {new Date().getFullYear()} Kabeer Cheema</span>
        <span className="font-mono">Built with React + Tailwind CSS</span>
      </div>
    </footer>
  );
}
