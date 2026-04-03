import Link from 'next/link';
//import { getProducts, deleteProduct } from '@/app/lib/actions';

export default async function ProductsPage() {
  //const products = await getProducts();

  return (
    <div>
      <h1>My Products</h1>

      <Link href="/products/create">Create Product</Link>

      {/* {products.map((p: any) => (
        <div key={p.id}>
          <h3>{p.name}</h3>

          <Link href={`/products/${p.id}/edit`}>Edit</Link>
          <form action={deleteProduct} >
            <input type="hidden" name="id" value={p.id} />
            <button type="submit">Delete</button>
          </form>
        </div>
      ))} */}
    </div>
  );
}
