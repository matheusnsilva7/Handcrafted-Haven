export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  artisan?: string;
  image?: string;
  imageUrl?: string;
  rating?: number;   // promedio de estrellas (ej. 4.5)
  reviews?: {        // lista de reseñas
    user: string;
    comment: string;
    stars: number;
  }[];
}
