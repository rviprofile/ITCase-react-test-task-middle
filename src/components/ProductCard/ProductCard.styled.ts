import styled from "@emotion/styled";

export const CardContainer = styled.div`
  background-color: #48494f9a;
  display: flex;
  flex-direction: row;
  height: 150px;
  width: 450px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  width: 100%;
`;

export const Heading = styled.p`
  font-size: 30px;
  font-weight: 800;
`;

export const Button = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 10px;
  background-color: #65666cff;
  position: absolute;
  right: 10px;
  bottom: 10px;
  transition: all 0.2s ease;
  &:hover {
    background-color: #85878eff;
  }
  &:after {
    content: " ₽";
  }
`;
