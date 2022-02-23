import React, {useState, useEffect} from "react";
import PokemonList from "./components/PokemonList";
import axios from "axios";
import "./App.css";
import Image from "./images/AshPikachu.png";
function App() {
  const [pokemon, updatePokemon] = useState([]);
  const [basicPokemonUrl, updateBasicPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?&limit=50"
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <img
          src={Image}
          alt="ash and pikachu from snipstock"
          style={{width: "200px"}}
        />
        <h1
          className="MainTitle"
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "2.3rem",
            margin: "0 20px 10px 0",
          }}
        >
          Pokedex
        </h1>
      </div>

      <PokemonList allPokemon={pokemon} isLoading={loading} />
    </>
  );
}

export default App;
