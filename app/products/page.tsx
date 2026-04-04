import Link from "next/link";

export default async function ProductsPage() {
  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
  const products = await res.json();

  return (
    <div className="products-page">
      <h1>My Products</h1>
      <Link href="/products/create" className="btn-primary">Create Product</Link>

      {products.length === 0 && <p>No products yet.</p>}

      <div className="products-list">
        {products.map((p: any) => (
          <div key={p.id} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>${p.price}</p>
            <p><strong>Category:</strong> {p.category}</p>
            <p><strong>Artisan:</strong> {p.artisan}</p>
            {p.imageUrl && <img src={p.imageUrl} alt={p.name} />}

            <div className="product-actions">
              <Link href={`/products/${p.id}/edit`} className="action-button edit">Edit</Link>
              <Link href={`/products/${p.id}/delete`} className="action-button delete">Delete</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
