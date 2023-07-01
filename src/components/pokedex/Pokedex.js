import "../../styles/pokedex.css";
import Context from "../../contexts/PokemonListContext";
import pokedexImage from "../../images/pokedex.png";
import Evolutions from './evolutions';
import { useState, useEffect, useContext } from "react";

const Pokedex = (props) => {
  const context = useContext(Context);
  const [dataPokemon, setDataPokemon] = useState({});
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    loadDataPokemon();
  }, []);

  const close = () => {
    context.setPokedexOpened(false);
    document.body.classList.remove("no-scroll");
    closePokemon();
  };

  const closePokemon = () => {
    const pkmn = document.getElementById(props.selectedPokemon);
    pkmn.classList.remove("closed");
  };

  const loadDataPokemon = async () => {
    const specie = await context.consumeAPI(
      `https://pokeapi.co/api/v2/pokemon-species/${props.selectedPokemon}`
    );
    const pokemon = await context.consumeAPI(
      `https://pokeapi.co/api/v2/pokemon/${props.selectedPokemon}`
    );

    const allDescriptions = specie.flavor_text_entries.filter(
      (description) => description.language.name === "en"
    );
    const descriptionsNoRepeated = [
      ...new Map(
        allDescriptions.map((description) => [
          description.flavor_text,
          description,
        ])
      ).values(),
    ];

    const evolutionsChain = await context.consumeAPI(specie.evolution_chain.url);
    setEvolutions(evolutionsChain);
    
    setDataPokemon({
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      descriptions: descriptionsNoRepeated,
    });
  };

  return (
    <div className="pokedex-container fixed">
      <div
        className="pokedex-background-color fixed hand-cursor"
        onClick={close}
      ></div>

      <Evolutions evolutionsList={evolutions} />
    </div>
  );
};

export default Pokedex;
