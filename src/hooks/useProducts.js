import { useState, useEffect } from "react";

export function useProducts(limit = 30) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit]);

  return { products, loading, error };
}
