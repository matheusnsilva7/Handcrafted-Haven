let products: any[] = []; // memoria temporal

export async function GET() {
  return Response.json(products);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const newProduct = {
    id: Date.now().toString(),
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    category: formData.get("category") ?? "Uncategorized", // 👈 valor por defecto
    imageUrl: formData.get("imageUrl"),
    artisan: "Artesano Demo",
  };
  products.push(newProduct);
  return Response.json({ success: true, product: newProduct });
}

export async function PUT(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id") as string;

  const product = products.find((p) => p.id === id);
  if (!product) return Response.json({ error: "Not found" }, { status: 404 });

  product.name = formData.get("name") || product.name;
  product.price = formData.get("price") || product.price;
  product.description = formData.get("description") || product.description;
  product.category = formData.get("category") || product.category;
  product.imageUrl = formData.get("imageUrl") || product.imageUrl;

  return Response.json({ success: true, product });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  products = products.filter((p) => p.id !== id);
  return Response.json({ success: true });
}
