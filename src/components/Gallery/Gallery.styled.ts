import { Image } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  img.large {
    max-height: 450px;
    min-height: 450px;
    min-width: 350px;
    border-radius: 15px;
  }
  img {
    max-height: 80px;
    max-width: 60px;
    cursor: pointer;
  }
`;

export const SelectImage = styled(Image, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>`
  transition: all 0.2s ease;
  border-radius: 5px;
  ${(props) =>
    props.selected
      ? " box-shadow: 0px 0px 50px rgba(115, 115, 115, 0.5);"
      : ""};
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
