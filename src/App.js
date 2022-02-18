import React, {useState, useEffect} from "react";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

//use axios to get data from pokemon api

function App() {
  //pass the default/initial state, first state we want is list of pokemon
  //returns an array with two variables - current state and method we can use to update our state (destructured array)
  const [pokemon, updatePokemon] = useState([]);
  //now setting up state for the current page we are on
  const [basicPokemonUrl, updateBasicPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  //loading will store as true or false, by default our application is loading
  const [loading, updateLoading] = useState(true);

  //useEffect (which is a hook) takes a function, pass an array of arguments, and when an argument changes, it will rerun the effect
  //when we leave the array empty - means that we will rerender only once, meaning we will only fetch the data one time
  //when we put in currentPageUrl, the app will rerender when the page url changes
  //an effect is something we want to happen and then rerender our app when it does happen

  const fetchAllPokemon = () => {
    // let cancel;
    axios
      .get(
        basicPokemonUrl
        //   , {
        //   cancelToken: new axios.CancelToken((c) => (cancel = c)),

        // }
      )
      .then((res) => {
        //we have our data, so no longer loading
        updateLoading(false);
        updatePokemon(res.data.results.map((p) => p.name));
        localStorage.setItem("pokemon", JSON.stringify(res.data.results));
      });

    //to cancel old request when we make a new request
    //so app doesn't load old data if an old request finishes before a new request
    // return () => cancel();
  };

  const checkLocalStorageForAllPokemon = () => {
    console.log("checking local storage all pokemon");
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

      console.log("parsedData all pokemon: " + JSON.stringify(parsedData));
      // console.log("parsed data: " + JSON.stringify(parsedData));
      const pokemonArray = parsedData.map((p) => p.name);
      console.log(pokemonArray);
      updatePokemon(pokemonArray);
      updateLoading(false);
    }
  }, [basicPokemonUrl]);

  console.log(JSON.stringify(pokemon));

  if (loading) return "Loading...";

  //use empty html tags (fragment) b/c js can only return one thing
  return (
    <>
      <h1 className="MainTitle">Pokemon!</h1>
      <PokemonList allPokemon={pokemon} isLoading={loading} />
    </>
  );
}

export default App;
