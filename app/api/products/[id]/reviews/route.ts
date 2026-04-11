import { NextResponse } from "next/server";
import { sampleProducts } from "../../../../lib/sample-products";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json(); // { user, stars, comment }

  const product = sampleProducts.find((p) => p.id === id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  if (!product.reviews) product.reviews = [];

  product.reviews.push({
    user: body.user,
    comment: body.comment,
    stars: body.stars,
  });

  const totalStars = product.reviews.reduce((sum, r) => sum + r.stars, 0);
  product.rating = totalStars / product.reviews.length;

  return NextResponse.json({ success: true, product });
}
