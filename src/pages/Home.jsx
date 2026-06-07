import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Layers, TrendingUp, Search } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { ProductSkeleton } from "../components/Skeleton";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export function Home() {
  const { products, loading, error } = useProducts(30);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["all", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        activeCategory === "all" || p.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [products, search, activeCategory]);

  const stats = useMemo(() => ({
    total: products.length,
    categories: [...new Set(products.map((p) => p.category))].length,
    avgPrice: products.length
      ? (products.reduce((s, p) => s + p.price, 0) / products.length).toFixed(2)
      : 0,
  }), [products]);

  return (
    <div className="min-h-screen bg-ink">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#FF4D00 1px, transparent 1px), linear-gradient(90deg, #FF4D00 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-accent/5 blur-2xl" />

        <div className="relative max-w-7xl mx-auto">
          <div
            className="inline-flex items-center gap-2 border border-accent/30 rounded-full px-4 py-1.5 mb-8"
            style={{ animation: "fadeUp 0.5s ease forwards" }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-muted uppercase tracking-widest">
              API Live — dummyjson.com
            </span>
          </div>

          <h1
            className="font-display font-black text-paper leading-none mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", animation: "fadeUp 0.6s 0.1s ease both" }}
          >
            Dummy
            <span className="text-accent">Data</span>
            <br />
            Dashboard
          </h1>

          <p
            className="font-body text-muted text-lg max-w-xl mb-10 leading-relaxed"
            style={{ animation: "fadeUp 0.6s 0.2s ease both" }}
          >
            Explorador de productos en tiempo real. Datos obtenidos desde la API
            pública de DummyJSON — filtra, busca y visualiza.
          </p>

          <div
            className="flex flex-wrap items-center gap-4"
            style={{ animation: "fadeUp 0.6s 0.3s ease both" }}
          >
            <Button size="lg" className="gap-2">
              Ver Productos
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Link to="/entities">
              <Button variant="outline" size="lg" className="gap-2">
                <Layers className="w-4 h-4" />
                Ver Entidades
              </Button>
            </Link>
          </div>

          {/* Stats */}
          {!loading && (
            <div
              className="grid grid-cols-3 gap-6 mt-16 max-w-lg"
              style={{ animation: "fadeUp 0.6s 0.4s ease both" }}
            >
              {[
                { label: "Productos", value: stats.total, icon: Package },
                { label: "Categorías", value: stats.categories, icon: Layers },
                { label: "Precio Promedio", value: `$${stats.avgPrice}`, icon: TrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="border border-border rounded-xl p-4 bg-ink-muted/50">
                  <Icon className="w-4 h-4 text-accent mb-2" />
                  <div className="font-display font-bold text-2xl text-paper">{value}</div>
                  <div className="text-xs font-mono text-muted uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Productos */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full bg-ink-muted border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm font-body text-paper placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-accent text-white"
                    : "border border-border text-muted hover:border-accent/50 hover:text-paper"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-paper text-2xl">
            {filtered.length} <span className="text-muted font-normal text-lg">productos</span>
          </h2>
          <Badge variant="secondary">{activeCategory}</Badge>
        </div>

        {error && (
          <div className="text-center py-20 text-accent font-mono">
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
            : filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  style={{ animationDelay: `${i * 30}ms`, animation: "fadeUp 0.5s ease both" }}
                />
              ))}
        </div>
      </section>
    </div>
  );
}
