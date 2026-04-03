export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const price = formData.get('price');
    const description = formData.get('description');

    console.log('API RECEIVED:', { name, price, description });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Error' }, { status: 500 });
  }
}