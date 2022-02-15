import React, {useState, useEffect} from "react";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

//use axios to get data from pokemon api

function App() {
  //pass the default/initial state, first state we want is list of pokemon
  //returns an array with two variables - current state and method we can use to update our state (destructured array)
  const [pokemon, setPokemon] = useState([]);
  //now setting up state for the current page we are on
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  //loading will store as true or false, by default our application is loading
  const [loading, setLoading] = useState(true);

  //useEffect (which is a hook) takes a function, pass an array of arguments, and when an argument changes, it will rerun the effect
  //when we leave the array empty - means that we will rerender only once, meaning we will only fetch the data one time
  //when we put in currentPageUrl, the app will rerender when the page url changes
  //an effect is something we want to happen and then rerender our app when it does happen
  useEffect(() => {
    //to make more user friendly, have loading message
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        //we have our data, so no longer loading
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      });

    //to cancel old request when we make a new request
    //so app doesn't load old data if an old request finishes before a new request
    return () => cancel();
  }, [currentPageUrl]);

  console.log(JSON.stringify(pokemon));

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading...";

  //use empty html tags (fragment) b/c js can only return one thing
  return (
    <>
      <h1 className="MainTitle">Pokemon!</h1>
      <PokemonList allPokemon={pokemon} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
