import { Button } from "@chakra-ui/react";
import { CartItem } from "../../components/CartItem/CartItem";
import { useCart } from "../../layouts/CartContext";
import * as S from "./CartPage.styled";

export const CartPage = () => {
  const { products, clearCart } = useCart();
  const isCartEmpty = products.length === 0;
  return (
    <S.CartContainer>
      {!isCartEmpty ? (
        products.map((product) => {
          return <CartItem key={product.cartId} product={product} />;
        })
      ) : (
        <S.EmptyMessage>ПУСТО</S.EmptyMessage>
      )}
      {!isCartEmpty && (
        <Button onClick={clearCart} size={"xl"} width={450}>
          Очистить корзину
        </Button>
      )}
    </S.CartContainer>
  );
};
