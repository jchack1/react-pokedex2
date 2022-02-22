import React, {useState, useEffect} from "react";
import PokemonCard from "./Card";
import Filter from "./Filter";
import styled from "styled-components";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PokemonList = ({allPokemon, isLoading}) => {
  const [loadingPokemon, updateLoadingPokemon] = useState(true);
  const [allAbilitiesState, updateAllAbilitiesState] = useState([]);
  const [allTypesState, updateAllTypesState] = useState([]);
  const [pokemonDataState, updatePokemonDataState] = useState([]);

  const [selectedTypes, updateSelectedTypes] = useState([]);
  const [selectedAbilities, updateSelectedAbilities] = useState([]);
  const [typesAndOr, updateTypesAndOr] = useState("or");
  const [abilitiesAndOr, updateAbilitiesAndOr] = useState("or");

  const checkLocalStorageForPokemon = (pokemon) => {
    const data = localStorage.getItem(`${pokemon}`);
    return data;
  };

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
  // console.log("pokemonDataState:" + JSON.stringify(pokemonDataState));
  // console.log("allabilitesState:" + JSON.stringify(allAbilitiesState));
  // console.log("alltypesState: " + JSON.stringify(allTypesState));

  console.log(
    "selectedAbilities: " +
      JSON.stringify(selectedAbilities) +
      " " +
      typeof selectedAbilities
  );
  console.log("list abilities andor: " + JSON.stringify(abilitiesAndOr));
  //currently, we can have any of the below conditions - make sure this is what we want
  return (
    <PageContainer>
      <Filter
        typeOptions={allTypesState}
        abilityOptions={allAbilitiesState}
        selectedAbilities={selectedAbilities}
        selectedTypes={selectedTypes}
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
