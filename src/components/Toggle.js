import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;

  p {
    color: white;
    font-weight: 500;
    font-size: 0.8rem;
  }
`;
const ToggleContainer = styled.div`
  background: ${(props) => (props.active === "and" ? "#9ef0bc" : "#ffe085")};
  height: 30px;
  width: 62px;
  border-radius: 20px;
  position: relative;
  transition: 0.3s;
  margin: 10px;
`;

const Toggle = styled.div`
  background: ${(props) => (props.active === "and" ? "#00d94f" : "#fcc212 ")};
  transform: ${(props) =>
    props.active === "and" ? "translateX(33px)" : "translateX(0px)"};
  height: 30px;
  width: 30px;
  top: 0;
  left: 0;
  border-radius: 20px;
  transition: 0.3s;
`;

export default (props) => {
  return (
    <Container>
      <p>OR</p>
      <ToggleContainer onClick={props.onClick} active={props.active}>
        <Toggle active={props.active} />
      </ToggleContainer>
      <p>AND</p>
    </Container>
  );
};
