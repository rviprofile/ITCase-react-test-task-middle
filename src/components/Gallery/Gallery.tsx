import { useEffect, useState } from "react";
import * as S from "./Gallery.styled";
import { Image, Skeleton } from "@chakra-ui/react";

/** Галерея для переключения картинок */
export const Gallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);
  return (
    <S.Gallery>
      {images.length > 0 ? (
        <Image src={selectedImage || ""} className="large" />
      ) : (
        <Skeleton height="450" width="350" />
      )}
      <S.Row>
        {images.map((image) => {
          return (
            <S.SelectImage
              key={image}
              src={image}
              selected={selectedImage === image}
              onClick={() => setSelectedImage(image)}
            />
          );
        })}
      </S.Row>
    </S.Gallery>
  );
};
