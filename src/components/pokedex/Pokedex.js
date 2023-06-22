import "../../styles/pokedex.css"
import Context from "../../contexts/PokemonListContext";
import pokedexImage from "../../images/pokedex.png"
import { useState, useEffect, useContext } from "react";

const Pokedex = (props) => {
    const opened = props.pokedexOpened;
    const context = useContext(Context);

    useEffect (() => {
        document.body.classList.add("no-scroll");
    }, []);

    const close = () => {
        context.setPokedexOpened(false);
        document.body.classList.remove("no-scroll");
        closePokemon();
    }

    const closePokemon = () => {
        const pkmn = document.getElementById(props.selectedPokemon);
        pkmn.classList.remove("flip");
    }

    return(
        <div className="pokedex-container fixed">
            <div className="pokedex-background-color fixed hand-cursor" onClick={close}></div>    
            <img
                  className="pokedex fixed scale-[1.8] mt-8 mb-4"
                  src={pokedexImage}
                  alt="Descripción de la imagen"
            />

        </div>
    );
}

export default Pokedex;