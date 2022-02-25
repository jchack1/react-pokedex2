### Pokedex version 2

A few years ago while attending SAIT I made the first version of the Pokedex app with vanilla Javascript, fetching data from the PokeAPI. I revisited this project and re-created it with React. This time around I added caching, filtering for ability and type, and improved styling.

The names of the first 50 pokemon are fetched and stored in local storage. For each name, we then fetch the rest of the pokemon's data from the PokeAPI, which is also added to local storage. A card is rendered for each pokemon.

The front of the card shows the name, id number, and image for the pokemon. When clicked, the card flips to show the height, weight, types, and abilities of the pokemon.

You can filter which pokemon are displayed based on ability and type. You can toggle between "and" & "or"; for example, if you select multiple types, you can choose whether you want to see pokemon with either type, or with both types.

You may view the app here: https://react-pokedex-v2.netlify.app/
