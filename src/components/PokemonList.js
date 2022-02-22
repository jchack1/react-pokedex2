import React, {useState, useEffect} from "react";
import PokemonCard from "./Card";
import styled from "styled-components";
import axios from "axios";

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PokemonList = ({allPokemon, isLoading}) => {
  console.log("all pokemon: " + JSON.stringify(allPokemon));

  // let pokemonData = [];
  // let allAbilities = [];
  // let allTypes = [];

  const [loadingPokemon, updateLoadingPokemon] = useState(true);
  const [allAbilitiesState, updateAllAbilitiesState] = useState([]);
  const [allTypesState, updateAllTypesState] = useState([]);
  const [pokemonDataState, updatePokemonDataState] = useState([]);

  //what if i do a fetch here for each pokemon
  //could add each one to an object i map through
  //and cache each pokemon individually
  //if pokemon in the cache, get each one from cache and build same object to map through
  //for each pokemon, get their abililties and types and put into object here for filtering

  //first check the first pokemon and see if it's in the cache, if one is they all should be
  //then for pokemon of allPokemon do the fetch of get cached item

  const checkLocalStorageForPokemon = (pokemon) => {
    const data = localStorage.getItem(`${pokemon}`);
    return data;
  };

  // const gatherAbilities = (abilities) => {
  //   for (const ability of abilities) {
  //     if (!allAbilities.includes(ability)) {
  //       allAbilities.push(ability);
  //     }
  //   }
  // };

  // const gatherTypes = (types) => {
  //   for (const type of types) {
  //     if (!allTypes.includes(type)) {
  //       allTypes.push(type);
  //     }
  //   }
  // };

  const fetchPokemonData = (pokemonNames) => {
    let allData = [];
    let allAbilities = [];
    let allTypes = [];

    for (const pokemon of pokemonNames) {
      //do a fetch
      console.log(`fetching data for ${pokemon}`);

      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

      axios.get(url).then((res) => {
        //get abilities and types, push them to abilities and types arrays

        const pokemonAbilities = res.data.abilities.map((x) => {
          return x.ability.name;
        });

        const pokemonTypes = res.data.types.map((type) => {
          return type.type.name;
        });

        // gatherAbilities(pokemonAbilities);
        // gatherTypes(pokemonTypes);

        for (const ability of pokemonAbilities) {
          if (!allAbilities.includes(ability)) {
            allAbilities.push(ability);
          }
        }
        for (const type of pokemonTypes) {
          if (!allTypes.includes(type)) {
            allTypes.push(type);
          }
        }

        // console.log(
        //   "pokemonabilities fetch: " + JSON.stringify(pokemonAbilities)
        // );
        // console.log("pokemintypes fetch: " + JSON.stringify(pokemonTypes));
        //push object of only the data we need to pokemonData array

        allData.push({
          pokemon: pokemon,
          abilities: pokemonAbilities,
          types: pokemonTypes,
          height: res.data.height,
          weight: res.data.weight,
          idNumber: res.data.id,
          sprite: res.data.sprites["front_default"],
        });

        //save this pokemon's data to localStorage

        localStorage.setItem(
          `${pokemon}`,
          JSON.stringify({
            abilities: res.data.abilities,
            types: res.data.types,
            height: res.data.height,
            weight: res.data.weight,
            id: res.data.id,
            sprites: res.data.sprites,
          })
        );
      });
    }
    console.log("allDataFetch: " + JSON.stringify(allData));

    updateAllAbilitiesState(allAbilities);
    updateAllTypesState(allTypes);
    updatePokemonDataState(allData);
    updateLoadingPokemon(false);
  };

  useEffect(() => {
    //first check localstorage for a pokemon - tells us if we have them already
    const pokemonIsCached = checkLocalStorageForPokemon(allPokemon[0]);

    console.log("pokemoniscached: " + JSON.stringify(pokemonIsCached));

    if (pokemonIsCached === null) {
      fetchPokemonData(allPokemon);
    }

    if (pokemonIsCached !== null) {
      console.log("pokemon are cached");

      let allData = [];
      let allAbilities = [];
      let allTypes = [];

      for (const pokemon of allPokemon) {
        const currentPokemonData = JSON.parse(
          localStorage.getItem(`${pokemon}`)
        );

        // console.log(
        //   "currentPokemonData: " + JSON.stringify(currentPokemonData)
        // );

        const pokemonAbilities = currentPokemonData.abilities.map((x) => {
          return x.ability.name;
        });

        const pokemonTypes = currentPokemonData.types.map((type) => {
          return type.type.name;
        });

        for (const ability of pokemonAbilities) {
          if (!allAbilities.includes(ability)) {
            allAbilities.push(ability);
          }
        }
        for (const type of pokemonTypes) {
          if (!allTypes.includes(type)) {
            allTypes.push(type);
          }
        }

        //push object of only the data we need to pokemonData array

        allData.push({
          pokemon: pokemon,
          abilities: pokemonAbilities,
          types: pokemonTypes,
          height: currentPokemonData.height,
          weight: currentPokemonData.weight,
          idNumber: currentPokemonData.id,
          sprite: currentPokemonData.sprites["front_default"],
        });
      }
      console.log("allDataCache: " + JSON.stringify(allData));

      updateAllAbilitiesState(allAbilities);
      updateAllTypesState(allTypes);
      updatePokemonDataState(allData);
      updateLoadingPokemon(false);
    }
  }, [allPokemon]);

  // const uniqueAbilities = [...new Set(allAbilities)];
  // console.log("unique abilities" + JSON.stringify(uniqueAbilities));

  if (loadingPokemon) {
    return (
      <PokemonContainer>
        <p>Loading...</p>
      </PokemonContainer>
    );
  }
  console.log("pokemonDataState:" + JSON.stringify(pokemonDataState));
  console.log("allabilitesState:" + JSON.stringify(allAbilitiesState));
  console.log("alltypesState: " + JSON.stringify(allTypesState));

  //currently, we can have any of the below conditions - make sure this is what we want
  return (
    <PokemonContainer>
      {pokemonDataState.map((pokemon, index) => (
        <PokemonCard
          key={index}
          pokemon={pokemon}
          filteredTypes={[]}
          filteredAbilities={["keen-eye"]}
          typesAndOr={"or"}
          abilitiesAndOr={"or"}
          // allAndOr={"or"}
        ></PokemonCard>
      ))}
    </PokemonContainer>
  );
};

export default PokemonList;
