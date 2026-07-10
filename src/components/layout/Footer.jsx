const CONTAINER = "container";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className={`${CONTAINER} site-footer__inner`}>
        <span>© {new Date().getFullYear()} Kabeer Cheema</span>
        <span>Designed for software systems.</span>
      </div>
    </footer>
  );
}
