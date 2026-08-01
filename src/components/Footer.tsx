import { Link } from "react-router-dom";
import { categories } from "@/registry/categories";

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="container-px mx-auto max-w-7xl py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold text-ink">GINTIVERSE</p>
            <p className="mt-2 max-w-xs text-sm text-mist">Useful tools for everyday life.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Categories</p>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={c.path} className="text-sm text-mist transition hover:text-accent">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Resources</p>
            <ul className="mt-3 space-y-2">
              <li><Link to="/tools" className="text-sm text-mist transition hover:text-accent">All Tools</Link></li>
              <li><Link to="/about" className="text-sm text-mist transition hover:text-accent">About</Link></li>
              <li><Link to="/contact" className="text-sm text-mist transition hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Legal</p>
            <ul className="mt-3 space-y-2">
              <li><Link to="/privacy" className="text-sm text-mist transition hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-mist transition hover:text-accent">Terms</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-mist transition hover:text-accent">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-line pt-6 text-xs text-mist">
          © {new Date().getFullYear()} GintiVerse. Calculations run in your browser — your inputs are never sent to a server.
        </p>
      </div>
    </footer>
  );
}
