import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/api";
import { Product } from "../../types";
import * as S from "./CatalogPage.styled";
import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export const CatalogPage = () => {
  const { data } = useQuery({
    queryKey: ["catalog"],
    queryFn: () => getProducts(),
  });

  return (
    <S.CatalogContainer>
      <Grid templateColumns="repeat(2, 450px)" gap="10">
        {(data as Product[])?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Grid>
    </S.CatalogContainer>
  );
};
