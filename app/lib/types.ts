export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  artisan?: string;
  image?: string;     // para productos de ejemplo
  imageUrl?: string;  // para productos reales de la API
}
