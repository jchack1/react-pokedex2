import React, {useState, useEffect} from "react";
import PokemonCard from "./Card";
import Filter from "./Filter";
import styled from "styled-components";
import axios from "axios";
import Loading from "./Loading";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0;
`;
const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PokemonList = ({allPokemon}) => {
  const [loadingPokemon, updateLoadingPokemon] = useState(true);
  const [allAbilitiesState, updateAllAbilitiesState] = useState([]);
  const [allTypesState, updateAllTypesState] = useState([]);
  const [pokemonDataState, updatePokemonDataState] = useState([]);

  const [selectedTypes, updateSelectedTypes] = useState([]);
  const [selectedAbilities, updateSelectedAbilities] = useState([]);
  const [typesAndOr, updateTypesAndOr] = useState("or");
  const [abilitiesAndOr, updateAbilitiesAndOr] = useState("or");

  const checkSessionStorageForPokemon = (pokemon) => {
    const data = sessionStorage.getItem(`${pokemon}`);
    return data;
  };

  const fetchPokemonData = async (pokemonNames) => {
    //chatgpt helped me with this code

    const requests = pokemonNames.map((pokemon) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
      return axios.get(url);
    });

    try {
      const responses = await Promise.all(requests);
      responses.forEach((res) => {
        sessionStorage.setItem(
          `${res.data.name}`,
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
    } catch (error) {
      console.error(error);
    }
    getCachedData(allPokemon);
    return true;
  };

  const getCachedData = async (allPokemon) => {
    let allData = [];
    let allAbilities = [];
    let allTypes = [];

    for (const pokemon of allPokemon) {
      const currentPokemonData = JSON.parse(
        sessionStorage.getItem(`${pokemon}`)
      );

      if (currentPokemonData === null) {
        console.log(`cache for ${pokemon} null, continuing`);
        continue;
      }

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

    updateAllAbilitiesState(allAbilities);
    updateAllTypesState(allTypes);
    updatePokemonDataState(allData);
    updateLoadingPokemon(false);
  };

  useEffect(() => {
    //first check sessionStorage for a pokemon - tells us if we have them already

    let pokemonIsCached = checkSessionStorageForPokemon(allPokemon[0]);

    if (pokemonIsCached === null) {
      fetchPokemonData(allPokemon);
    }

    if (pokemonIsCached !== null) {
      console.log("pokemon are cached");
      getCachedData(allPokemon);
    }
  }, [allPokemon]);

  if (loadingPokemon) {
    return (
      <PokemonContainer>
        <Loading />
      </PokemonContainer>
    );
  }

  return (
    <PageContainer>
      <Filter
        typeOptions={allTypesState}
        abilityOptions={allAbilitiesState}
        updateSelectedTypes={updateSelectedTypes}
        updateSelectedAbilities={updateSelectedAbilities}
        updateTypesAndOr={updateTypesAndOr}
        updateAbilitiesAndOr={updateAbilitiesAndOr}
        typesAndOr={typesAndOr}
        abilitiesAndOr={abilitiesAndOr}
      />
      <PokemonContainer>
        {pokemonDataState.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            filteredAbilities={selectedAbilities}
            filteredTypes={selectedTypes}
            typesAndOr={typesAndOr}
            abilitiesAndOr={abilitiesAndOr}
          ></PokemonCard>
        ))}
      </PokemonContainer>
    </PageContainer>
  );
};

export default PokemonList;
