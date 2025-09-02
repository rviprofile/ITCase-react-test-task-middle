import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ProductInCart } from "../types";

type CartContextType = {
  /** Продукты в корзине */
  products: ProductInCart[];
  /** Перезаписать содержание корзины */
  setProducts: React.Dispatch<React.SetStateAction<ProductInCart[]>>;
  /** Добавить в корзину */
  addProduct: (item: ProductInCart) => void;
  /** Удалить из корзины */
  removeProduct: (item: ProductInCart) => void;
  /** Очистить корзину */
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cart_products";

/** Провайдер контекста корзины. Позволяет на любом уровне читать и управлять содержанием корзины. */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductInCart[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as ProductInCart[]) : [];
    }
    return [];
  });

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (item: ProductInCart) => {
    setProducts((prev) => [...prev, item]);
  };
  const removeProduct = (item: ProductInCart) => {
    setProducts((prev) =>
      prev.filter((product) => product.cartId !== item.cartId)
    );
  };
  const clearCart = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{ products, setProducts, addProduct, clearCart, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("context is undefined");
  }
  return context;
};
