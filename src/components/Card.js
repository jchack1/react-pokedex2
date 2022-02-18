import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  background: white;
  flex-direction: column;
  border: 1px solid #ccc;
  box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
  margin: 20px;

  p {
    margin: 5px 15px;
    text-align: center;
  }
`;

const Sprite = styled.img`
  width: 150px;
`;

//return abilities markup based on how many abilities the pokemon has
const Abilities = ({abilities}) => {
  console.log("abilities.length:  " + abilities.length);
  return abilities.length > 1 ? (
    <p>
      <strong>Abilities: </strong>
      {abilities.map((ability, i) => {
        console.log("ability, i: " + ability + " " + i);
        if (i === abilities.length - 1) {
          return <span>{ability}</span>;
        } else {
          return <span>{ability}, </span>;
        }
      })}
    </p>
  ) : abilities.length === 1 ? (
    <p>
      <strong>Ability: </strong> {abilities[0]}
    </p>
  ) : (
    <p>
      <strong>Abilities: </strong>none
    </p>
  );
};

//return types markup based on how many types this pokemon has
const Types = ({types}) => {
  console.log("types.length:  " + types.length);
  return types.length > 1 ? (
    <p>
      <strong>Types: </strong>
      {types.map((type, i) => {
        console.log("type, i: " + type + " " + i);
        if (i === types.length - 1) {
          return <span>{type}</span>;
        } else {
          return <span>{type}, </span>;
        }
      })}
    </p>
  ) : types.length === 1 ? (
    <p>
      <strong>Type:</strong> {types[0]}
    </p>
  ) : (
    <p>
      <strong>Types:</strong> none
    </p>
  );
};

const Card = ({pokemon}) => {
  const [pokemonData, updatePokemonData] = useState({});
  const [loading, updateLoading] = useState(true);
  const [isFlipped, updateIsFlipped] = useState(false);

  const [abilities, updateAbilities] = useState([]);
  const [types, updateTypes] = useState([]);
  const [height, updateHeight] = useState("");
  const [weight, updateWeight] = useState("");
  const [idNumber, updateIdNumber] = useState("");
  const [sprite, updateSprite] = useState("");

  const fetchPokemonData = (pokemon) => {
    console.log(`fetching data for ${pokemon}`);

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    //get data
    axios.get(url).then((res) => {
      //update state
      updateLoading(false);
      updatePokemonData(res.data);
      updateAbilities(
        res.data.abilities.map((ability) => {
          return ability.name;
        })
      );
      updateTypes(
        res.data.types.map((type) => {
          return type.type.name;
        })
      );
      updateHeight(res.data.height);
      updateWeight(res.data.weight);
      updateIdNumber(res.data.id);
      updateSprite(res.data.sprites["front_default"]);

      //add to local storage
      localStorage.setItem(`${pokemon}`, JSON.stringify(res.data));
    });
  };

  const checkLocalStorageForPokemon = (pokemon) => {
    const data = localStorage.getItem(`${pokemon}`);
    return data;
  };

  useEffect(() => {
    //first check localstorage for the pokemon data
    const data = checkLocalStorageForPokemon(pokemon);

    if (data === null) {
      fetchPokemonData(pokemon);
    }
    if (data !== null) {
      //parse data
      const parsedData = JSON.parse(data);

      //update state
      updatePokemonData(parsedData);
      updateAbilities(
        parsedData.abilities.map((x) => {
          return x.ability.name;
        })
      );
      updateTypes(
        parsedData.types.map((type) => {
          return type.type.name;
        })
      );
      updateHeight(parsedData.height);
      updateWeight(parsedData.weight);
      updateIdNumber(parsedData.id);
      updateSprite(parsedData.sprites["front_default"]);
      updateLoading(false);
    }
  }, [pokemon]);

  if (loading) {
    return <Container />;
  }

  //return card that is "flipped" or unflipped, updated by onClick fxn
  return isFlipped ? (
    <Container onClick={() => updateIsFlipped(!isFlipped)}>
      <p>
        <strong>Height: </strong>
        {height}
      </p>
      <p>
        <strong>Weight:</strong> {weight}
      </p>
      <Types types={types} />
      <Abilities abilities={abilities} />
    </Container>
  ) : (
    <Container onClick={() => updateIsFlipped(!isFlipped)}>
      <Sprite src={sprite} alt="pokemon sprite" />
      <h1>{pokemon}</h1>
      <p>#{idNumber}</p>
    </Container>
  );
};
export default Card;
