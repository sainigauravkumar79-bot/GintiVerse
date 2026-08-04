import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IconRenderer } from "./IconRenderer";
import { use3DTilt } from "@/hooks/use3DTilt";
import type { ToolMeta } from "@/registry/types"; // Correct import

export function ToolCard3D({ tool, _index = 0 }: { tool: ToolMeta; _index?: number }) {
  const { ref, tilt, onPointerMove, onPointerLeave } = use3DTilt<HTMLAnchorElement>(6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(_index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000"
    >
      <Link
        ref={ref}
        to={tool.slug}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)",
          transformStyle: "preserve-3d",
        }}
        className="glass-surface group block h-full rounded-card p-5 transition-shadow hover:shadow-glass-hover"
      >
        <div
          style={{ transform: "translateZ(24px)" }}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent"
        >
          <IconRenderer name={tool.icon} size={20} />
        </div>
        <h3 style={{ transform: "translateZ(16px)" }} className="mt-4 font-display text-base font-semibold text-ink">
          {tool.name}
        </h3>
        <p style={{ transform: "translateZ(8px)" }} className="mt-1.5 text-sm leading-relaxed text-mist">
          {tool.description}
        </p>
      </Link>
    </motion.div>
  );
}
