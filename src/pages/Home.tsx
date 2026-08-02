import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCard3D } from '@/components/ToolCard3D';
import { getAllTools, getToolsByCategory, categories } from '@/registry/tools';

const Home: React.FC = () => {
  // Featured tools (पहले 6)
  const featured = getAllTools().slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-ink">GintiVerse – Every Tool You Need</h1>
        <p className="text-mist mt-2 text-lg">
          All calculators, converters and generators, in one place.
        </p>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-ink mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <span className="text-xl block">{cat.icon}</span>
              <span className="font-medium text-ink">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section>
        <h2 className="text-2xl font-semibold text-ink mb-4">⭐ Featured Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((tool) => (
            <ToolCard3D key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
