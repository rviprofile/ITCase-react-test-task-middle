import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
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

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "cart_products";

/** Провайдер контекста корзины. Позволяет на любом уровне читать и управлять содержанием корзины. */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useLocalStorage<ProductInCart[]>(
    STORAGE_KEY,
    []
  );

  /** Функция добавления товара в корзину */
  const addProduct = useCallback(
    (item: ProductInCart) => {
      setProducts((prev) => {
        /** Есть ли товар в корзине */
        const exists = prev.some((p) => p.cartId === item.cartId);
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

  /** Мемоизация объекта контекста, чтобы не вызывать перерендеры всех потомков */
  const value = useMemo(
    () => ({ products, addProduct, removeProduct, clearCart }),
    [products, addProduct, removeProduct, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("context is undefined");
  }
  return context;
};
