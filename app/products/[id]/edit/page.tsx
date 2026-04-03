//import { getProductById, updateProduct } from '@/app/lib/actions';

export default async function EditPage({ params }: any) {
  //const product = await getProductById(params.id);

  return (
    <form /* action={updateProduct} */>
      <input type="hidden" name="id" /* value={product.id} */ />

      <input name="name" /* defaultValue={product.name} */ />
      <input name="price" /* defaultValue={product.price} */ />
      <textarea name="description" /*  defaultValue={product.description} */ />

      <button type="submit">Update</button>
    </form>
  );
}
