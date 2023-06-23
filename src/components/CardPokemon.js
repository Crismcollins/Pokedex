import Context from "../contexts/PokemonListContext";
import { openPokemon, closePokemon, getTranslateValues } from "../scripts/CenterAnimation.js"
import "../styles/animations.css";
import "../styles/types.css";
import { useContext, useEffect, useState } from "react";

const CardPokemon = (props) => {
  const [detail, setDetail] = useState({});
  const [specie, setSpecie] = useState({});
  const [card, setCard] = useState(null);
  const pokemon = props.data;
  const context = useContext(Context);

  useEffect (() => {
    setCard(document.getElementById(pokemon.id));
    setPokemonSpecie();
    
  }, []);

  useEffect (() => {
    if (null !== card)
      addListenner();
    //console.log(detail)
  }, [card]);

  const setPokemonSpecie = async () => {
    const specieList = await context.consumeAPI(
      `https://pokeapi.co/api/v2/pokemon-species/${props.id}`
    );

    await setSpecie(specieList);
  }

  const getDetail = async (id) => {

    if (context.pokedexOpened){
      closeCard(id);
      return;
    }

    const descriptionsLanguage = specie.flavor_text_entries.filter(description => description.language.name === "es");
    const removeRepeatedDescriptions = [...new Map(descriptionsLanguage.map(description => [description.flavor_text, description])).values()];
        
    
    setDetail({
      id: pokemon.id,
      name: pokemon.name,
      flavor: removeRepeatedDescriptions,
      height: pokemon.height,
      weight: pokemon.weight
    });

    openCard(id);
  };

  const openCard = (id) => {
    openPokemon(card);
    selectPokemon(id, true);
  }

  const closeCard = (id) => {
    closePokemon(card);
    selectPokemon(0, false);
  }

  const selectPokemon = (idPokemon, pokedexOpen) => {
    //idPokemon 0 is none
    context.setSelectedPokemon(idPokemon);
    context.setPokedexOpened(pokedexOpen);
  }

  const addZeroToLeft = (number) => {
    return ("00" + number).slice(-3);
  };

  const addListenner = () => {
    card.addEventListener("animationend", (event) => {
      if (event.animationName === "minimizeElement") {
        card.classList.remove("closed");
      }
    });
  }

  return (
    <div className="text-white bg-indigo-950 capitalize hand-cursor no-select rounded-2xl">
      <div className={`pr-4 rounded-xl p-3 sm:hidden ${pokemon.types[0].type.name}-type ${pokemon.types[0].type.name}-border`}>
        <div className="flex justify-between">
          <h2 className="text-2xl text-center">{pokemon.name}</h2>
          <h3 className="text-2xl">#{addZeroToLeft(pokemon.id)}</h3>
        </div>

        <div className="flex justify-between">
          <div className="my-auto">
            {pokemon.types.map((type, i) => (
              <div
                className={`${type.type.name}-type h-max py-0.5 w-20 my-4 rounded-3xl text-center ${type.type.name}-tab`}
                key={i}
              >
                <span>{type.type.name}</span>
              </div>
            ))}
          </div>
          <div className="flex-shrink-0">
            <img
              className="scale-[1.8] mt-8 mb-4"
              src={pokemon.sprites.front_default}
              alt="Descripción de la imagen"
            />
          </div>
        </div>
      </div>

      <div
        className={`hidden cardPokemon sm:block rounded-xl p-3 ${pokemon.types[0].type.name}-type ${pokemon.types[0].type.name}-border`}
        id={props.id}
        onClick={() => getDetail(props.id)}
      >
        
          <div className="">
            <h3 className="text-2xl">#{addZeroToLeft(pokemon.id, specie)}</h3>
          </div>

          <div>
            <img
              className="mx-auto scale-150 mt-8 mb-4"
              src={pokemon.sprites.front_default}
              alt="Descripción de la imagen"
            />
            <h2 className="text-2xl text-center">{pokemon.name}</h2>
            <div
              className={`flex flex-wrap justify-between gap-2 mb-1 mt-3 ${
                pokemon.types.length === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {pokemon.types.map((type, i) => (
                <div
                  className={`${type.type.name}-type h-max py-0.5 w-20 rounded-3xl text-center mx-auto ${type.type.name}-tab`} 
                  key={i}
                >
                  <span>{type.type.name}</span>
                </div>
              ))}
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default CardPokemon;
