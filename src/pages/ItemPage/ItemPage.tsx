import * as S from "./ItemPage.styled";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct, getSizes } from "../../services/api";
import { Color, Product, Size } from "../../types";
import { useEffect, useState } from "react";
import { Button, Image } from "@chakra-ui/react";
import { Selector } from "../../components/Selector/Selector";
import { useCart } from "../../layouts/CartContext";

/** Страница отдельного товара */
export const ProductPage = () => {
  /** id товара в URL */
  const { id } = useParams();
  const { products, addProduct } = useCart();

  /** Локальные состояния */
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<Color | undefined>(
    product?.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    /** При измениии цвета, ставим первую картинку выбранной */
    setSelectedImage(selectedColor?.images[0]);
    if (selectedSize && !selectedColor?.sizes.includes(selectedSize.id)) {
      setSelectedSize(undefined);
    }
  }, [selectedColor]);

  /** Запросы к API */
  const { data, error } = useQuery({
    queryKey: [`product-${id}`],
    queryFn: () => getProduct(Number(id)),
  });
  const { data: sizes } = useQuery({
    queryKey: [`sizes`],
    queryFn: () => getSizes(),
  });

  useEffect(() => {
    if (data && !error) {
      /** При обновлении данных, ставим первый цвет выбранным  */
      setProduct(data as Product);
      setSelectedColor((data as Product)?.colors[0]);
    }
  }, [data, error]);

  return (
    <S.ProductContainer>
      <S.Gallery>
        <Image src={selectedImage} className="main" />
        {selectedColor?.images && (
          <Selector
            mode={"image"}
            array={selectedColor?.images.map((image) => ({
              name: image,
              id: image,
            }))}
            onChange={setSelectedImage}
            selectedItem={
              selectedImage
                ? {
                    name: selectedImage,
                    id: selectedImage,
                  }
                : undefined
            }
          />
        )}
      </S.Gallery>
      <S.ProductContent>
        <S.Heading>{product?.name}</S.Heading>
        <S.Price>{selectedColor?.price}</S.Price>
        <S.Desciption>{selectedColor?.description}</S.Desciption>

        <S.Desciption></S.Desciption>
        {product?.colors && (
          <Selector
            mode={"button"}
            array={product?.colors}
            onChange={setSelectedColor}
            selectedItem={selectedColor}
          />
        )}
        {Array.isArray(sizes) && (
          <Selector
            mode={"button"}
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
          className={
            product &&
            products.some(
              (item) =>
                item.cartId === `${id}-${selectedColor?.id}-${selectedSize?.id}`
            )
              ? "remove_from_cart"
              : "add_to_cart"
          }
          disabled={!selectedColor || !selectedSize}
          onClick={() => {
            if (selectedColor && selectedSize) {
              addProduct({
                id: Number(id),
                cartId: `${id}-${selectedColor.id}-${selectedSize.id}`,
                name: product!.name,
                color: selectedColor,
                size: selectedSize,
              });
            }
          }}
        >
          {product &&
          products.some(
            (item) =>
              item.cartId === `${id}-${selectedColor?.id}-${selectedSize?.id}`
          )
            ? "В КОРЗИНЕ"
            : "В КОРЗИНУ"}
          <Image
            className={"add"}
            src={
              products.some(
                (item) =>
                  item.cartId ===
                  `${id}-${selectedColor?.id}-${selectedSize?.id}`
              )
                ? "/icons/remove_from_cart.svg"
                : "/icons/add_to_cart.svg"
            }
          />
        </Button>
      </S.ProductContent>
    </S.ProductContainer>
  );
};
