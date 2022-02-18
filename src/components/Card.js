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

//could do a fetch for each card, using the pokemon name
//save that data to variables
//then may be able to sort/filter
//eg. type - show only the pokemon where type =  grass etc
//needs to be associated with the card so cards can be manipulated
//should figure out how to cache the data so i'm not making a call whenever we change the page
//or, forget pagination, could just get the first 50 pokemon and their data, and work with that
//don't lose data since we're not switching pages

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

    axios.get(url).then((res) => {
      //we have our data, so no longer loading
      console.log(res);
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
      localStorage.setItem(`${pokemon}`, JSON.stringify(res.data));
    });
  };

  const checkLocalStorageForPokemon = (pokemon) => {
    console.log("checking local storage");
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
      const parsedData = JSON.parse(data);
      console.log("parsedData.height: " + JSON.stringify(parsedData.height));
      // console.log("parsed data: " + JSON.stringify(parsedData));

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
    //to cancel old request when we make a new request
    //so app doesn't load old data if an old request finishes before a new request
  }, [pokemon]);

  if (loading) {
    return <Container />;
  }
  console.log(abilities);

  return isFlipped ? (
    // <img src={logo} alt="loading" className="loading-logo" />

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
