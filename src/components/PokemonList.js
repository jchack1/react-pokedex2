import React, {useState} from "react";
import Card from "./Card";
import styled from "styled-components";

const PokemonList = ({allPokemon, isLoading}) => {
  const [isFlipped, updateIsFlipped] = useState(false);

  return isLoading ? (
    // <img src={logo} alt="loading" className="loading-logo" />
    <p>Loading...</p>
  ) : (
    <section className="main-container">
      {allPokemon.map((pokemon, index) => (
        <Card
          key={index}
          pokemon={pokemon}
          flipped={isFlipped}
          onClick={() => updateIsFlipped(!isFlipped)}
        ></Card>
      ))}
    </section>
  );
};

export default PokemonList;
