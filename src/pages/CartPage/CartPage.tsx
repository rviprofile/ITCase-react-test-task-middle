import { CartItem } from "../../components/CartItem/CartItem";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useCart } from "../../layouts/CartContext";
import * as S from "./CartPage.styled";

export const CartPage = () => {
  const { products } = useCart();
  return (
    <S.CartContainer>
      {products.length > 0 ? (
        products.map((product) => {
          return <CartItem product={product} />;
        })
      ) : (
        <S.EmptyMessage>ПУСТО</S.EmptyMessage>
      )}
    </S.CartContainer>
  );
};
