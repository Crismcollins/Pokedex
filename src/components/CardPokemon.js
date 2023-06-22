import Context from "../contexts/PokemonListContext";
import centerPokemon from "../scripts/CenterAnimation.js"
import "../styles/animations.css";
import "../styles/types.css";
import { useContext, useEffect, useState } from "react";

const CardPokemon = (props) => {
  const [detail, setDetail] = useState({});
  const pokemon = props.data;
  const context = useContext(Context);

  const getDetail = async (id) => {
    const specie = await context.consumeAPI(
      `https://pokeapi.co/api/v2/pokemon-species/${props.id}`
    );
    
    const descriptionsLanguage = specie.flavor_text_entries.filter(description => description.language.name === "es");
        
    const removeRepeatedDescriptions = [...new Map(descriptionsLanguage.map(description => [description.flavor_text, description])).values()];
        
    setDetail({
      flavor: removeRepeatedDescriptions,
    });
    
    const card = document.getElementById(id);
    centerPokemon(card);
    card.classList.add("flip");
    context.setSelectedPokemon(id);
    context.setPokedexOpened(true);
  };

  const addZeroToLeft = (number) => {
    return ("00" + number).slice(-3);
  };

  return (
    <div className="text-white p-4 ring ring-pink-500 ring-offset-2 capitalize hand-cursor no-select">
      <div className="pr-4 sm:hidden">
        <div className="flex justify-between">
          <h2 className="text-2xl text-center">{pokemon.name}</h2>
          <h3 className="text-2xl">#{addZeroToLeft(pokemon.id)}</h3>
        </div>

        <div className="flex justify-between">
          <div className="my-auto">
            {pokemon.types.map((type, i) => (
              <div
                className={`${type.type.name}-type h-max py-0.5 w-20 my-4 rounded-3xl text-center`}
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
        className="hidden cardPokemon sm:block"
        id={props.id}
        onClick={() => getDetail(props.id)}
      >
        
          <div className="">
            <h3 className="text-2xl">#{addZeroToLeft(pokemon.id)}</h3>
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
                  className={`${type.type.name}-type h-max py-0.5 w-20 rounded-3xl text-center mx-auto`}
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
