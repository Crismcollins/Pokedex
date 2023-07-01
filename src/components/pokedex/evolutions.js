import "../../styles/evolutions.css";
import Context from "../../contexts/PokemonListContext";
import { useState, useEffect, useContext } from "react";
import Evolution from "./Evolution"

const Evolutions = (props) => {
    const { evolutionsList } = props;
    const [chain, setChain] = useState({});
    const [totalEvolutions, setTotalEvolutions] = useState(0);
    const [pkmnSprite, setPkmnSprite] = useState({});
    const [evolutionProperties, setEvolutionProperties] = useState([]);
    const context = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!evolutionsList.chain)
            return;

        getEvolutions();
        evolutionsImg();
    }, [evolutionsList]);

    useEffect(() => {
        getEvolutionObjectProperties();
    }, [pkmnSprite]);

    const getEvolutions = () => {
        const firstPkmn = evolutionsList.chain;
        getEvolutionsChain(firstPkmn, 1);
    }

    const getEvolutionsChain = async (pkmn, indexEvolution) => {
        const chainCopy = chain;
        if (!chain.base)
            chainCopy.base = pkmn.species.name;
        
        if (pkmn.evolves_to.length <= 0)
            return;

        setTotalEvolutions(indexEvolution);
        chainCopy["evolution"+indexEvolution] = await pkmn.evolves_to.map((evolution) => {
            if (evolution.evolves_to.length > 0)
                getEvolutionsChain(evolution, indexEvolution + 1);

            return evolution.species.name
        });

        setChain(chainCopy);
    }

    
    const evolutionsImg = async () => {
        const pkmnSpriteCopy = {};
      
        pkmnSpriteCopy.base = [await getPkmnImage(chain.base)];
      
        for (let i = 1; i <= totalEvolutions; i++) {
            pkmnSpriteCopy["evolution" + i] = await Promise.all(
              chain["evolution" + i].map(async evolution => await getPkmnImage(evolution))
            );
          }
      
        setPkmnSprite(pkmnSpriteCopy);
      
        getEvolutionObjectProperties();
        setLoading(false);
    };
      

    const getEvolutionObjectProperties = () => {
        const arrProperties = Object.keys(chain).sort();
        setEvolutionProperties(arrProperties);
    }

    const getPkmnImage = async (pkmnName) => {
        const dataPkmn = await context.consumeAPI(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`);
        return dataPkmn.sprites.front_default;
    }

    if (loading) {
        return <div className="text-white">Cargando...</div>; // Renderizar un indicador de carga mientras se procesan los datos
    }
    
    return (
        <div className="flex flex-nowrap">
        {loading ? (
          <div className="text-white">Cargando...</div>
        ) : (
          evolutionProperties.map((property) => (
            <div className="flex" key={property}>
              {pkmnSprite[property]?.map((img, index) => (
                <Evolution key={`${property}-${index}`} pokemon={img} />
              ))}
            </div>
          ))
        )}
      </div>
    );
}

export default Evolutions;