export default async function MakersPage() {
  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
  const products = await res.json();

  const artesanos: Record<string, any[]> = {};
  products.forEach((p: any) => {
    if (!artesanos[p.artisan]) artesanos[p.artisan] = [];
    artesanos[p.artisan].push(p);
  });

  return (
    <div className="makers-page">
      <div className="makers-header">
        <h1>Explora los artesanos y sus productos</h1>
        <p>Descubre piezas únicas creadas con pasión y dedicación.</p>
      </div>

      {Object.keys(artesanos).length === 0 && <p>No hay artesanos aún.</p>}

      {Object.entries(artesanos).map(([artesano, items]) => (
        <div key={artesano} className="maker-section">
          <h2 className="maker-title">{artesano}</h2>
          <div className="maker-products">
            {items.map((p: any) => (
              <div key={p.id} className="maker-card">
                <h3>{p.name}</h3>
                <p><strong>Categoría:</strong> {p.category}</p>
                <p><strong>Precio:</strong> ${p.price}</p>
                {p.imageUrl && <img src={p.imageUrl} alt={p.name} />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
