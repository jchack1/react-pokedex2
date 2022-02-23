import React from "react";
import styled from "styled-components";
import Image from "../images/pokeball-snipstock.png";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;
const Loading = () => (
  <LoadingContainer>
    <img
      src={Image}
      className="loading-bounce"
      style={{width: "200px", height: "200px", display: "block"}}
      alt="pokeball"
    />
    <h2 style={{color: "white"}}>Loading...</h2>
  </LoadingContainer>
);

export default Loading;
