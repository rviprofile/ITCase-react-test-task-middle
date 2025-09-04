import { Image } from "@chakra-ui/react";
import * as S from "./Header.styled";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../layouts/CartContext";

/** Заголовок страниц */
export const Header = () => {
  const location = useLocation();
  const { products } = useCart();
  return (
    <S.Header>
      <Link to={"/"}>
        <S.NavButton
          selected={location.pathname === "/"}
          padding={"5"}
          size={"xl"}
        >
          КАТАЛОГ
        </S.NavButton>
      </Link>
      <Link to={"/cart"}>
        <S.NavButton
          selected={location.pathname === "/cart"}
          padding={"5"}
          size={"xl"}
        >
          КОРЗИНА
          {products.length > 0 && (
            <S.CartCounter>{products.length}</S.CartCounter>
          )}
          <Image src={"/icons/empty_cart.svg"} />
        </S.NavButton>
      </Link>
    </S.Header>
  );
};
