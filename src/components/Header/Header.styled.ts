import styled from "@emotion/styled";
import { Button, Image } from "@chakra-ui/react";

export const Header = styled.header`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 25px 150px;
`;

export const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>`
  transition: all 0.2s ease;
  position: relative;
  ${(props) =>
    props.selected
      ? "  filter: brightness(1.5); box-shadow: 0px 0px 30px rgba(115, 115, 115, 0.5);"
      : ""};
`;

export const CartCounter = styled.div`
  position: absolute;
  padding: 5px;
  min-width: 35px;
  min-height: 35px;
  border-radius: 15px;
  right: -15px;
  bottom: 25px;
  background-color: #ff0000ff;
`;
