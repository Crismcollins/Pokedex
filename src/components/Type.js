import Context from '../contexts/PokemonListContext';
import { useState, useContext, useEffect } from "react";

const Type = (props) => {
    const [types, setTypes] = useState([]);
    const context = useContext(Context);

    const getTypes = async () => {
        const typesList = await context.consumeAPI("https://pokeapi.co/api/v2/type/");
        setTypes(typesList.results);
    }

    const setType = (type) => {
        const tab = type === "all" ? "" : type;
        props.setTypeSelected(tab);
        selectTab(type);
    }

    const selectTab = (type) => {
        const chips = document.getElementsByClassName("chip");

        Array.from(chips).forEach(chip => {
            chip.classList.remove("active");
        });

        document.getElementById(type+"-type").classList.add("active");
    }   

    useEffect (() => {
        getTypes();
    }, []);

    return (
        <div className='mx-auto mt-6'>
            <div className='flex flex-wrap gap-2'>
            <button type='button' onClick={() => setType("all")} id="all-type" className={`chip all-type h-max py-0.5 px-3 rounded-3xl text-center no-select active`} key="all">
                    <span>All</span>
            </button>
            
            {types
            .filter(type => type.name !== "unknown")
            .map((type, i) => ( 
                <button type='button' onClick={() => setType(type.name)} id={`${type.name}-type`} className={`chip ${type.name}-type h-max py-0.5 px-3 rounded-3xl text-center no-select`} key={i}>
                    <span>{type.name}</span>
                </button>
            ))}
        </div>
        </div>
    );
}

export default Type;