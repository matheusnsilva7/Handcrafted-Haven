import { Product } from "../lib/types";
import { sampleProducts } from "../lib/sample-products";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

// 👇 fuerza a que la página sea dinámica
export const dynamic = "force-dynamic";

export default async function MakersPage() {
  let products: Product[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, { cache: "no-store" });
    products = await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // Mezclar productos reales con los de ejemplo
  products = [...products, ...sampleProducts];

  // Agrupar por artesano
  const artesanos: Record<string, Product[]> = {};
  products.forEach((p) => {
    const key = p.artisan ?? "Sin artesano";
    if (!artesanos[key]) artesanos[key] = [];
    artesanos[key].push(p);
  });

  return (
    <div className="makers-page">
      <div className="makers-header">
        <h1>Explora los artesanos y sus productos</h1>
        <p>Descubre piezas únicas creadas con pasión y dedicación.</p>

        <div className="makers-actions">
          <Link href="/products/create">
            <button className="create-product-button">Crear producto</button>
          </Link>
        </div>
      </div>

      {Object.keys(artesanos).length === 0 && <p>No hay artesanos aún.</p>}

      <div className="makers-sections">
        {Object.entries(artesanos).map(([artesano, items]) => (
          <div key={artesano} className="maker-section">
            <h2 className="maker-title">{artesano}</h2>
            <div className="maker-products">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
