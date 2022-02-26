import React, {useState, useEffect} from "react";
import PokemonList from "./components/PokemonList";
import axios from "axios";
import "./App.css";
import Image from "./images/AshPikachu.png";
import Loading from "./components/Loading";
function App() {
  const [pokemon, updatePokemon] = useState([]);
  const [loading, updateLoading] = useState(true);
  const basicPokemonUrl = "https://pokeapi.co/api/v2/pokemon?&limit=50";

  const fetchAllPokemon = () => {
    axios.get(basicPokemonUrl).then((res) => {
      //update state and local storage
      updatePokemon(res.data.results.map((p) => p.name));
      sessionStorage.setItem("pokemon", JSON.stringify(res.data.results));

      //no longer loading
      updateLoading(false);
    });
  };

  const checkSessionStorageForAllPokemon = () => {
    const data = sessionStorage.getItem("pokemon");
    return data;
  };

  useEffect(() => {
    const data = checkSessionStorageForAllPokemon();

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

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
        <Loading />
      </div>
    );

  // console.log("pokemon app.js: " + JSON.stringify(pokemon));

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

      <PokemonList
        allPokemon={pokemon}
        isLoading={loading}
        updateIsLoading={updateLoading}
      />
    </>
  );
}

export default App;
