import styled from "@emotion/styled";

export const ProductContainer = styled.div`
  padding: 25px 150px;
  display: flex;
  gap: 50px;
  img.main {
    max-height: 450px;
    min-height: 450px;
    min-width: 250px;
    border-radius: 15px;
  }
`;

export const ProductContent = styled.div`
  width: 70dvw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  button {
    transition: all 0.42s ease;
  }
  button.add_to_cart {
    margin-top: 50px;
    width: 250px;
    justify-content: flex-start;
    position: relative;
    &:hover {
      img {
        transform: scale(1.1) rotate(2deg);
      }
    }
    img {
      transition: all 0.2s ease;
      position: absolute;
      width: 98px;
      right: 20px;
    }
  }
  button.remove_from_cart {
    margin-top: 50px;
    width: 250px;
    justify-content: flex-start;
    position: relative;
    &:hover {
      img {
        transform: scale(1.1) rotate(2deg);
      }
    }
    img {
      transition: all 0.2s ease;
      opacity: 0.4;
      position: absolute;
      width: 98px;
      right: 20px;
    }
  }
`;

export const Heading = styled.p`
  font-size: 60px;
  font-weight: 800;
`;
export const Desciption = styled.p`
  font-size: 20px;
  height: 100%;
`;

export const Price = styled.p`
  font-size: 24px;
  &:after {
    content: " ₽";
  }
`;
export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
