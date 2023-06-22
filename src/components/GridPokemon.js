import { useEffect } from "react";
import CardPokemon from "./CardPokemon";

const GridPokemon = (props) => {
  const pokemons = props.pokemons;

  useEffect(() => {
    //console.log(pokemons)
  }, [pokemons]);

  return (
    <div>
      <div className="flex justify-center items-center">
        {pokemons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full w-4/5 xl:w-9/12 mx-auto">
            {pokemons.map(pokemon => <CardPokemon data={pokemon} key={pokemon.id} id={pokemon.id} />)}
          </div>
        ) : (
          <h1>NO POKEMON</h1>
        )}
      </div>
    </div>
  );
};

export default GridPokemon;
