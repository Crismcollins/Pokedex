import "../../styles/evolutions.css";
import Context from "../../contexts/PokemonListContext";
import { useState, useEffect, useContext } from "react";

const Evolutions = (props) => {
    const { evolutionsList } = props;
    const [chain, setChain] = useState({});
    const [totalEvolutions, setTotalEvolutions] = useState(0);
    const [pkmnSprite, setPkmnSprite] = useState({});
    const [evolutionProperties, setEvolutionProperties] = useState([]);
    const context = useContext(Context);

    useEffect(() => {
        if (!evolutionsList.chain)
            return;

        getEvolutions();
        evolutionsImg();
        getEvolutionObjectProperties();
    }, [evolutionsList]);

    const getEvolutions = () => {
        const firstPkmn = evolutionsList.chain;
        getEvolutionsChain(firstPkmn, 1);
    }

    const getEvolutionsChain = (pkmn, indexEvolution) => {
        const chainCopy = chain;
        if (!chain.base)
            chainCopy.base = pkmn.species.name;
        
        if (pkmn.evolves_to.length <= 0)
            return;

        setTotalEvolutions(indexEvolution);
        chainCopy["evolution"+indexEvolution] = pkmn.evolves_to.map((evolution) => {
            if (evolution.evolves_to.length > 0)
                getEvolutionsChain(evolution, indexEvolution + 1);

            return evolution.species.name
        });

        setChain(chainCopy);
    }

    
    const evolutionsImg = async () => {
        const pkmnSpriteCopy = { ...pkmnSprite };

        pkmnSpriteCopy.base = await getPkmnImage(chain.base);

        for (let i = 1; i <= totalEvolutions; i++){
            pkmnSpriteCopy["evolution"+i] = [];

            await chain["evolution"+i].forEach(async (evolution) => {
                pkmnSpriteCopy["evolution"+i].push(await getPkmnImage(evolution));
            });
        }

        setPkmnSprite(pkmnSpriteCopy);
    }

    const getEvolutionObjectProperties = () => {
        const arrProperties = Object.keys(chain);
        setEvolutionProperties(arrProperties);
    }

    const getPkmnImage = async (pkmnName) => {
        const dataPkmn = await context.consumeAPI(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`);
        return dataPkmn.sprites.front_default;
    }
    
    return (
        <div>  
            {evolutionProperties.map((key) => (
                    <div className="flex">
                        <img src={pkmnSprite.base} alt={chain.base} />
                    </div>
            ))}
        </div>
    );
}

export default Evolutions;