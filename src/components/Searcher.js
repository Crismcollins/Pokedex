import { useState, useEffect } from "react";
import Type from "./Type";

const Searcher = (props) => {

    const [wordTyped, setWordTyped] = useState("");
    const [typeSelected, setTypeSelected] = useState("");
    const pokemons = props.pokemons;

    const setWordFromInput = (e) => {
        setWordTyped(e.target.value);
    }

    const filterPokemons = () => {
        const pokemonsFilteredByName = filterPokemonsByName(pokemons);
        const pokemonsFilteredByType = filterPokemonsByType(pokemonsFilteredByName);
        props.setPokemonsFiltered(pokemonsFilteredByType);
    }

    const filterPokemonsByName = (pokemonsList) => {
        if (wordTyped === "")
            return pokemonsList;

        return pokemonsList.filter((pokemon) => pokemon.name.includes(wordTyped))
    }

    const filterPokemonsByType = (pokemonsList) => {
        if (typeSelected === "")
            return pokemonsList;

        return pokemonsList.filter((pokemon) => pokemon.types.some((types) => types.type.name === typeSelected ));
    }

    useEffect (() => {
        if (pokemons !== null && pokemons !== ""){
            filterPokemons();
        }
    }, [wordTyped, typeSelected]);

  return (
    <div className="py-6 w-full text-center">
        <input 
        className="bg-white rounded-xl p-2 w-full md:w-3/6" 
        onChange={setWordFromInput} 
        type="text" 
        placeholder="Search Pokemon"
        />
        <div className=" md:w-8/12 lg:w-6/12 xl:w-6/12 mx-auto">
        <Type setTypeSelected={setTypeSelected}/>
        </div>
    </div>
  );
};

export default Searcher;
