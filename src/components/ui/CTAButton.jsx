/**
 * Polymorphic call-to-action button.
 * Renders as <a> when `href` is provided, <button> otherwise.
 * Supports "primary" and "secondary" variants.
 */
export function CTAButton({ children, href, onClick, variant = "primary", icon, className = "", ...rest }) {
  const base = "button";
  const variants = {
    primary: "button--primary",
    secondary: "button--secondary",
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
