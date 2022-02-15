import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
`;
const Card = ({pokemon, flipped}) => {
  return flipped ? (
    // <img src={logo} alt="loading" className="loading-logo" />
    <Container>
      <h1>Pokemon goes here</h1>
    </Container>
  ) : (
    <Container>
      <h1>other info goes here</h1>
    </Container>
  );
};
export default Card;
