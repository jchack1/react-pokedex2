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

// const Abilities = (abilities) => {
//   return(
//   <p>Abilities: {abilities.map(ability => {return <span>{ability},</span> })}</p>
//   )
// }

// const Types = (types) => {
//   return(
//   <p>Types: {types.map(type => {return <span>{type},</span> })}</p>
//   )
// }

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

  console.log("height: " + height);
  console.log("weight:" + weight);

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
        parsedData.abilities.map((ability) => {
          return ability.name;
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
    }
    //to cancel old request when we make a new request
    //so app doesn't load old data if an old request finishes before a new request
  }, [pokemon]);

  if (loading) {
    return <Container />;
  }

  return isFlipped ? (
    // <img src={logo} alt="loading" className="loading-logo" />

    <Container onClick={() => updateIsFlipped(!isFlipped)}>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      {types.map((type) => {
        return <p>{type}</p>;
      })}
      {abilities.map((ability) => {
        return <p>{ability}</p>;
      })}
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
