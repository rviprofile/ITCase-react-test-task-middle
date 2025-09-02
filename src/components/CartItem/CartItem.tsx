import * as S from "./CartItem.styled";
import { Link } from "react-router-dom";
import { ProductInCart } from "../../types";
import { Image } from "@chakra-ui/react";
import { useCart } from "../../layouts/CartContext";

/** Элемент корзины со ссылкой на него */
export const CartItem = ({ product }: { product: ProductInCart }) => {
  const { removeProduct } = useCart();
  return (
    <Link to={`/product/${product.id}`}>
      <S.CardContainer>
        <Image src={product.color.images[0]} alt={product.color.images[0]} />
        <S.CardContent>
          <>
            <S.Heading>{product.name}</S.Heading>
            <p>
              {product.color.name} {product.size.label}
            </p>
            <S.Price>{product.color.price}</S.Price>
          </>
        </S.CardContent>
        <S.RemoveButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            removeProduct(product);
          }}
        >
          <Image src={"/icons/cross.svg"} />
        </S.RemoveButton>
      </S.CardContainer>
    </Link>
  );
};
