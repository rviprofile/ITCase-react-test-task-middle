import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { ProductInCart } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartContextType = {
  /** Продукты в корзине */
  products: ProductInCart[];
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
  const [products, setProducts] = useLocalStorage<ProductInCart[]>(
    STORAGE_KEY,
    []
  );

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  /** Функция добавления товара в корзину */
  const addProduct = useCallback(
    (item: ProductInCart) => {
      setProducts((prev) => {
        /** Есть ли товар в корзине */
        const exists = prev.find((p) => p.cartId === item.cartId);
        if (exists) {
          return prev; // или обновить количество, если нужно
        }
        return [...prev, item];
      });
    },
    [setProducts]
  );

  /** Функция удаления одного продукта из корзины  */
  const removeProduct = useCallback(
    (item: ProductInCart) => {
      setProducts((prev) => prev.filter((p) => p.cartId !== item.cartId));
    },
    [setProducts]
  );

  /**Функция для удаления корзины */
  const clearCart = useCallback(() => {
    setProducts([]);
  }, [setProducts]);
  
  return (
    <CartContext.Provider
      value={{ products, addProduct, clearCart, removeProduct }}
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
