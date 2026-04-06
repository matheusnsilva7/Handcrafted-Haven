import { Product } from "../lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      {product.image && <img src={product.image} alt={product.name} />}
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      <p><em>{product.category}</em></p>
      {product.artisan && <p><strong>Artisan:</strong> {product.artisan}</p>}
    </div>
  );
}
