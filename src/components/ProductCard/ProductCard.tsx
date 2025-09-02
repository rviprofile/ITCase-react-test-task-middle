import { Link } from "react-router-dom";
import { Product } from "../../types";
import * as S from "./ProductCard.styled";
import { Image } from "@chakra-ui/react";

/** Карточка товара со ссылкой на него */
export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <S.CardContainer>
        <Image src={product.colors[0].images[0]} alt={product.colors[0].name} />
        <S.CardContent>
          <>
            <S.Heading>{product.name}</S.Heading>
          </>
          <S.Button>
            {" "}
            от {Math.min(...product.colors.map((color) => Number(color.price)))}
          </S.Button>
        </S.CardContent>
      </S.CardContainer>
    </Link>
  );
};
