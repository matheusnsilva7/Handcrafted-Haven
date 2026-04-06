import Link from "next/link";
import { Product } from "../lib/types";
import { sampleProducts } from "../lib/sample-products";
import ProductCard from "../components/ProductCard";

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
    products = await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  const featured: Product[] = sampleProducts.reduce((acc: Product[], product: Product) => {
    if (!acc.find((p) => p.category === product.category)) {
      acc.push(product);
    }
    return acc;
  }, []);

  return (
    <div className="products-page">
      <h1>Handcrafted Haven</h1>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="featured-list">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* My Products (API) */}
      <section className="products-section">
        <h2>My Products</h2>
        <Link href="/products/create" className="btn-primary">Create Product</Link>

        {products.length === 0 && <p>No products yet.</p>}

        <div className="products-list">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
