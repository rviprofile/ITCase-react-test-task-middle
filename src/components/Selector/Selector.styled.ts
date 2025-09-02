import styled from "@emotion/styled";
import { Button, Image } from "@chakra-ui/react";

export const Selector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  img {
    max-height: 80px;
    cursor: pointer;
  }
  button {
    text-transform: uppercase;
    padding: 15px 40px;
  }
`;
export const SelectButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>`
  transition: all 0.2s ease;

  ${(props) =>
    props.selected
      ? "  filter: brightness(1.5); box-shadow: 0px 0px 30px rgba(115, 115, 115, 0.5);"
      : ""};
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
