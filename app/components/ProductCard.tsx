import Link from "next/link";
import { Product } from "../lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card">
        {product.image && <img src={product.image} alt={product.name} />}
        {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
        <h3>{product.name}</h3>
        <p><strong>${product.price}</strong></p>
        <p><em>{product.category}</em></p>
      </div>
    </Link>
  );
}
