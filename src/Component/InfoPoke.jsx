import {useState,useEffect,useContext} from 'react';
import Contex from '../Contex';
import {result} from '../db/TypePoke.json';
function InfoPoke(datos) {
    const [DataPoke, setDataPoke] = useState()
    const [pokeShiny, setPokeShiny] = useState(false);
    const [nature, setNature] = useState()
    const valor = useContext(Contex)

    const handleShiny=()=>{
        if(!pokeShiny)setPokeShiny(true);
        if(pokeShiny)setPokeShiny(false);
    }


    const CallApi=()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${(datos.valor+valor)}`)
        .then(response=>response.json())
        .then(dato=>setDataPoke(dato))
        .catch(error=>console.log(error));
    }


    const CallApiNature=()=>{
        fetch("https://pokeapi.co/api/v2/nature/?offset=0&limit=25")
        .then(response=>response.json())
        .then(dato=>setNature(dato.results))
        .catch(erro=>console.error(erro))
    }

    useEffect(() => {
        CallApi();
        CallApiNature();
    }, [])
    
   
  return (
    <div className=" flex justify-center items-center flex-col h-[650px] w-[800px] bg-[#031626] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl opacity-90">
      <div className='flex justify-end items-end w-full'>
      <p onClick={()=>{datos.CloseModal(),datos.bluerClose()}} className="text-white text-[25px] hover:text-red-400 px-5">X</p>
      </div>
    {DataPoke&&(
        <div className='flex justify-center items-center flex-col'>
       
        <h1 className='text-white text-center text-[30px]'><strong>{DataPoke.forms[0].name}</strong></h1>
        <img onClick={handleShiny} className='h-[150px]' src={!pokeShiny?`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(datos.valor+valor)}.png`:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${(datos.valor+valor)}.png`} alt="" />

            <div>
                {DataPoke.types.length < 2 ? (
                    <div className='flex justify-center items-center flex-col'>
                        <img className='h-[50px]' src={result[DataPoke.types[0].type.name]} alt="" />
                        <div className='text-white'>{DataPoke.types[0].type.name}</div>
                    </div>
                ) : (
                    <div className='grid grid-cols-2 gap-5'>
                    <img className='h-[50px]' src={result[DataPoke.types[0].type.name]} alt="" />
                    <img className='h-[50px]' src={result[DataPoke.types[1].type.name]} alt="" />
                   <h1 className='text-white'>{DataPoke.types[0].type.name}</h1>
                   <h1 className='text-white'>{DataPoke.types[1].type.name}</h1>
                    </div>
                )}
                </div>

        <div className='grid grid-cols-2 gap-5'>
            <p className='text-white text-center'><strong>HP:</strong>{DataPoke.stats[0].base_stat}</p>
            <p className='text-white text-center'><strong>Attack:</strong>{DataPoke.stats[1].base_stat}</p>
            <p className='text-white text-center'><strong>Defense:</strong>{DataPoke.stats[2].base_stat}</p>
            <p className='text-white text-center'><strong>Special Attack:</strong>{DataPoke.stats[3].base_stat}</p>
            <p className='text-white text-center'><strong>Special Defense:</strong>{DataPoke.stats[4].base_stat}</p>
            <p className='text-white text-center'><strong>Speed:</strong>{DataPoke.stats[5].base_stat}</p>    
            </div>
            <p className='text-white text-center mt-5 mb-2'><strong>Total:</strong>{parseInt(DataPoke.stats[0].base_stat)+parseInt(DataPoke.stats[1].base_stat)+parseInt(DataPoke.stats[2].base_stat)+parseInt(DataPoke.stats[3].base_stat)+parseInt(DataPoke.stats[4].base_stat)+parseInt(DataPoke.stats[5].base_stat)}</p> 
            <h1 className='text-white mb-2'><strong>Abilities</strong></h1> 
            <select>
            {
                DataPoke.abilities.map((value,index)=>(
                    <option key={index} value="">
                        {value.ability.name}
                    </option>
                ))
            }
            </select>

            <h1 className='text-white mb-2'><strong>Nature</strong></h1>
            <select>            
           {
        nature?.map((value,index)=>(
                <option key={index}>
                    {value.name}
                </option>
            ))
           }
            </select>


        </div>
        )
    }

    {/* <button onClick={()=>{datos.CloseModal(),datos.bluerClose()}} className="bg-white w-[80px] rounded-lg mt-5 hover:bg-red-400">Cerrar</button> */}
    </div>
  )
}

export default InfoPoke