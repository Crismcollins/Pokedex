import './App.css';
import Pokedex from "./components/pokedex/Pokedex";
import GridPokemon from './components/GridPokemon';
import Searcher from './components/Searcher';
import { useState, useEffect } from "react";
import PokemonListContext from './contexts/PokemonListContext';

function App() {

  const [pokemons, setPokemons] = useState(null);
  const [pokemonsFiltered, setPokemonsFiltered] = useState("");
  const [pokedexOpened, setPokedexOpened] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  const consumeAPI = async (url) => await (await fetch(url)).json();

  const getAllPokemons = async () => {
    const data = await consumeAPI("https://pokeapi.co/api/v2/generation/1/");
    await getPokemonData(data.pokemon_species);
  }

  const getPokemonData = async (pokemonsList) => {
    if (!pokemonsList || pokemonsList.length < 1)
        return;

    const pokemonsData = await Promise.all(
        pokemonsList.map(async (data) => {
          const dataSplitted = data.url.split("/");
          const id = dataSplitted[dataSplitted.length - 2];
          return await consumeAPI(`https://pokeapi.co/api/v2/pokemon/${id}`);
        })
      );

    await pokemonsData.sort((pokemon1, pokemon2) => pokemon1.id - pokemon2.id);
    await setPokemons(pokemonsData);
    await setPokemonsFiltered(pokemonsData);
  }

  const addZeroToLeft = (number) => {
    return ("00" + number).slice(-3);
  };
  
  useEffect(() => {
    getAllPokemons();
  }, []);

  const contextValue = {
    consumeAPI: consumeAPI,
    setPokedexOpened: setPokedexOpened,
    setSelectedPokemon: setSelectedPokemon,
    pokedexOpened: pokedexOpened,
    addZeroToLeft: addZeroToLeft
  };

  return (
    <PokemonListContext.Provider value={contextValue}>
      <div className='dark:bg-slate-800 min-h-screen p-5'>
      <Searcher setPokemonsFiltered={setPokemonsFiltered} pokemons={pokemons}/>
      <GridPokemon pokemons={pokemonsFiltered}/>
      {pokedexOpened && <Pokedex opened={pokedexOpened} selectedPokemon={selectedPokemon} />}
    </div>
    </PokemonListContext.Provider>
  );
}

export default App;
