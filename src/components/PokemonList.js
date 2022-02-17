import React, {useState} from "react";
import Card from "./Card";
import styled from "styled-components";

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PokemonList = ({allPokemon, isLoading}) => {
  return isLoading ? (
    // <img src={logo} alt="loading" className="loading-logo" />
    <p>Loading...</p>
  ) : (
    <PokemonContainer>
      {allPokemon.map((pokemon, index) => (
        <Card key={index} pokemon={pokemon}></Card>
      ))}
    </PokemonContainer>
  );
};

export default PokemonList;
