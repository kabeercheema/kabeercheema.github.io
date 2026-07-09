/**
 * Polymorphic call-to-action button.
 * Renders as <a> when `href` is provided, <button> otherwise.
 * Supports "primary" and "secondary" variants.
 */
export function CTAButton({ children, href, onClick, variant = "primary", icon, className = "", ...rest }) {
  const base = "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all";
  const variants = {
    primary: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-sm shadow-cyan-500/20",
    secondary:
      "border border-slate-300 bg-transparent text-slate-700 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-cyan-300",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} {...rest}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {icon}
      {children}
    </button>
  );
}
