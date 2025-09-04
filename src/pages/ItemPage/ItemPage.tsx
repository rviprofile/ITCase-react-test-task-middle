import * as S from "./ItemPage.styled";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct, getSizes } from "../../services/api";
import { Color, Product, Size } from "../../types";
import { useEffect, useMemo, useState } from "react";
import { Button, Image } from "@chakra-ui/react";
import { Selector } from "../../components/Selector/Selector";
import { useCart } from "../../layouts/CartContext";
import { Gallery } from "../../components/Gallery/Gallery";

/** Страница отдельного товара */
export const ProductPage = () => {
  /** id товара в URL */
  const { id } = useParams();
  const { products, addProduct } = useCart();

  /** API-запросы */
  const { data: product } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProduct(Number(id)) as Promise<Product>,
  });

  const { data: sizes } = useQuery<Size[]>({
    queryKey: ["sizes"],
    queryFn: () => getSizes() as Promise<Size[]>,
  });

  /** Локальные состояния */
  const [selectedColor, setSelectedColor] = useState<Color | undefined>();
  const [selectedSize, setSelectedSize] = useState<Size | undefined>();

  /** Автовыбор первого цвета при загрузке продукта */
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  /** Сброс размера, если он недоступен для нового цвета */
  useEffect(() => {
    if (selectedSize && !selectedColor?.sizes.includes(selectedSize.id)) {
      setSelectedSize(undefined);
    }
  }, [selectedColor, selectedSize]);

  /** Id товара для корзины */
  const cartId = useMemo(
    () => `${id}-${selectedColor?.id}-${selectedSize?.id}`,
    [id, selectedColor, selectedSize]
  );

  /** Флаг: товар уже в корзине */
  const inCart = useMemo(
    () => products.some((item) => item.cartId === cartId),
    [products, cartId]
  );

  /** Обработчик добавления в корзину */
  const handleAddToCart = () => {
    if (product && selectedColor && selectedSize) {
      addProduct({
        id: Number(id),
        cartId,
        name: product.name,
        color: selectedColor,
        size: selectedSize,
      });
    }
  };

  return (
    <S.ProductContainer>
      <Gallery images={selectedColor?.images || []} />
      <S.ProductContent>
        <S.Heading>{product?.name}</S.Heading>
        <S.Price>{selectedColor?.price}</S.Price>
        <S.Desciption>{selectedColor?.description}</S.Desciption>

        <S.Desciption></S.Desciption>
        {product?.colors && (
          <Selector
            array={product?.colors}
            onChange={setSelectedColor}
            selectedItem={selectedColor}
          />
        )}
        {Array.isArray(sizes) && (
          <Selector
            array={(sizes as Size[])?.map((size) => ({
              ...size,
              name: size.label,
              disabled: !selectedColor?.sizes.includes(size.id),
            }))}
            onChange={setSelectedSize}
            selectedItem={
              selectedSize && { ...selectedSize, name: selectedSize?.label }
            }
          />
        )}
        <Button
          padding={"5"}
          size={"2xl"}
          className={inCart ? "remove_from_cart" : "add_to_cart"}
          disabled={!selectedColor || !selectedSize}
          onClick={handleAddToCart}
        >
          {inCart ? "В КОРЗИНЕ" : "В КОРЗИНУ"}
          <Image
            className="add"
            src={
              inCart ? "/icons/remove_from_cart.svg" : "/icons/add_to_cart.svg"
            }
          />
        </Button>
      </S.ProductContent>
    </S.ProductContainer>
  );
};
