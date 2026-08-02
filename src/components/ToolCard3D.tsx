import React from 'react';
import { Link } from 'react-router-dom';
import { use3DTilt } from '@hooks/use3DTilt';
import { ToolMeta } from '@/registry/tools';
import { IconRenderer } from './IconRenderer'; // मान लिया आपके पास है

interface ToolCard3DProps {
  tool: ToolMeta;
  index?: number;
}

export const ToolCard3D: React.FC<ToolCard3DProps> = ({ tool, index = 0 }) => {
  const { ref, tilt, onPointerMove, onPointerLeave } = use3DTilt(6);

  return (
    <Link
      to={tool.slug}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="block rounded-2xl bg-white p-6 shadow-card transition-transform duration-200 hover:-translate-y-1"
      style={{ transform: tilt }}
    >
      <div className="flex items-center gap-3">
        <IconRenderer icon={tool.icon} className="h-6 w-6 text-accent" />
        <h3 className="font-semibold text-ink">{tool.name}</h3>
      </div>
      <p className="mt-2 text-sm text-mist">{tool.description}</p>
    </Link>
  );
};
