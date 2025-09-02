export type Product = {
  id: number;
  name: string;
  colors: Color[];
};

export type Color = {
  id: number;
  name: string;
  images: string[];
  price: string;
  description: string;
  sizes: number[];
};

export type Size = { id: number; label: string; number: number };

export type ProductInCart = {
  id: number;
  cartId: string;
  name: string;
  color: Color;
  size: Size;
};
