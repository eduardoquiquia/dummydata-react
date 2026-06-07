import { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/Skeleton";
import {
  Star,
  Package,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";

function SortIcon({ field, sortConfig }) {
  if (sortConfig.key !== field) return <ChevronsUpDown className="w-3 h-3 opacity-30" />;
  return sortConfig.direction === "asc" ? (
    <ChevronUp className="w-3 h-3 text-accent" />
  ) : (
    <ChevronDown className="w-3 h-3 text-accent" />
  );
}

export function Entities() {
  const { products, loading, error } = useProducts(100);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [page, setPage] = useState(1);
  const perPage = 15;

  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      const mult = sortConfig.direction === "asc" ? 1 : -1;
      if (typeof aVal === "number") return (aVal - bVal) * mult;
      return String(aVal).localeCompare(String(bVal)) * mult;
    });
  }, [products, sortConfig]);

  const paginated = sorted.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(sorted.length / perPage);

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { ...prev, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
    setPage(1);
  };

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "thumbnail", label: "IMG", sortable: false },
    { key: "title", label: "Producto", sortable: true },
    { key: "category", label: "Categoría", sortable: true },
    { key: "brand", label: "Marca", sortable: true },
    { key: "price", label: "Precio", sortable: true },
    { key: "discountPercentage", label: "Descuento", sortable: true },
    { key: "rating", label: "Rating", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    { key: "availabilityStatus", label: "Disponibilidad", sortable: false },
  ];

  return (
    <div className="min-h-screen bg-ink pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10" style={{ animation: "fadeUp 0.5s ease both" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center border border-accent/20">
              <Package className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="font-display font-black text-paper text-3xl">Entidades</h1>
              <p className="font-body text-muted text-sm">
                Listado completo de productos · {products.length} registros
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-accent via-border to-transparent" />
        </div>

        {error && (
          <div className="text-accent font-mono py-10 text-center">Error: {error}</div>
        )}

        {/* Table */}
        <div
          className="rounded-xl border border-border overflow-hidden"
          style={{ animation: "fadeUp 0.5s 0.1s ease both" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-ink-muted border-b border-border">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={`px-4 py-3 text-left font-display font-semibold text-xs uppercase tracking-wider text-muted whitespace-nowrap ${
                        col.sortable ? "cursor-pointer hover:text-paper select-none" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {col.label}
                        {col.sortable && <SortIcon field={col.key} sortConfig={sortConfig} />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 15 }).map((_, i) => (
                      <tr key={i} className="border-b border-border/50">
                        {columns.map((col) => (
                          <td key={col.key} className="px-4 py-3">
                            <Skeleton className="h-4 w-full max-w-[120px]" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : paginated.map((product, i) => (
                      <tr
                        key={product.id}
                        className="border-b border-border/30 hover:bg-ink-muted/50 transition-colors"
                        style={{ animationDelay: `${i * 20}ms`, animation: "fadeUp 0.4s ease both" }}
                      >
                        <td className="px-4 py-3 font-mono text-muted text-xs">
                          #{String(product.id).padStart(3, "0")}
                        </td>
                        <td className="px-4 py-3">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded-md border border-border"
                          />
                        </td>
                        <td className="px-4 py-3 text-paper font-medium max-w-[200px]">
                          <span className="line-clamp-2">{product.title}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary">{product.category}</Badge>
                        </td>
                        <td className="px-4 py-3 text-muted font-mono text-xs">
                          {product.brand || "—"}
                        </td>
                        <td className="px-4 py-3 text-accent font-display font-bold">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-mono text-xs ${product.discountPercentage > 15 ? "text-accent" : "text-muted"}`}>
                            -{product.discountPercentage.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            <span className="font-mono text-xs text-paper">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`font-mono text-xs ${
                              product.stock < 20 ? "text-red-400" : "text-green-400"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              product.availabilityStatus === "In Stock"
                                ? "default"
                                : "outline"
                            }
                          >
                            {product.availabilityStatus || "—"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-ink-muted border-t border-border">
              <span className="text-xs font-mono text-muted">
                Página {page} de {totalPages} · {sorted.length} registros
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs font-mono border border-border rounded-md text-muted hover:text-paper hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.min(Math.max(page - 2, 1), totalPages - 4) + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 text-xs font-mono rounded-md transition-all ${
                        pageNum === page
                          ? "bg-accent text-white"
                          : "border border-border text-muted hover:border-accent/50 hover:text-paper"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-xs font-mono border border-border rounded-md text-muted hover:text-paper hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
