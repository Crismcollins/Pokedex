import { useState, useEffect } from "react";

const Evolution = (props) => {
    const {pokemon} = props;

    useEffect(() => {
        console.log(pokemon)
    }, []);

    return (
        <div className="">
            <img src={pokemon} alt={pokemon} />
        </div>
    )
}

export default Evolution;