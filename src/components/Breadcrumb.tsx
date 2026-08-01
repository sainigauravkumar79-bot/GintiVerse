import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-mist">
      {items.map((item, i) => (
        <span key={item.path} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={14} className="shrink-0" />}
          {i === items.length - 1 ? (
            <span className="text-ink">{item.name}</span>
          ) : (
            <Link to={item.path} className="transition hover:text-accent">
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
