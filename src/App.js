import React, {useState, useEffect} from "react";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, updatePokemon] = useState([]);
  const [basicPokemonUrl, updateBasicPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [loading, updateLoading] = useState(true);

  const fetchAllPokemon = () => {
    axios.get(basicPokemonUrl).then((res) => {
      //we have our data, so no longer loading, then update state and local storage
      updateLoading(false);
      updatePokemon(res.data.results.map((p) => p.name));
      localStorage.setItem("pokemon", JSON.stringify(res.data.results));
    });
  };

  const checkLocalStorageForAllPokemon = () => {
    const data = localStorage.getItem("pokemon");
    return data;
  };

  useEffect(() => {
    const data = checkLocalStorageForAllPokemon();

    if (data === null) {
      fetchAllPokemon();
    }
    if (data !== null) {
      const parsedData = JSON.parse(data);

      const pokemonArray = parsedData.map((p) => p.name);

      updatePokemon(pokemonArray);
      updateLoading(false);
    }
  }, [basicPokemonUrl]);

  if (loading) return "Loading...";

  return (
    <>
      <h1 className="MainTitle">Pokemon!</h1>
      <PokemonList allPokemon={pokemon} isLoading={loading} />
    </>
  );
}

export default App;
