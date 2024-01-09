import {useEffect, useState} from 'react';
function Card(data) {
const [Url, setUrl] = useState(data.url.split("/"))
const [pokeShiny, setPokeShiny] = useState(false);
const [Change, setChange] = useState(0)

useEffect(() => {
setChange(parseInt(data.PokeIndex)+parseInt(Url[Url.length-2]))
}, [])

const handleValue=()=>{
  data.fn(Change);
  data.openModal();
  data.bluerOpen();
  console.log(parseInt(data.PokeIndex)+parseInt(Url[Url.length-2]));
}





  return (
    <div className='h-[190px] w-[180px] bg-white rounded-xl flex justify-center items-center flex-col'>
        <h1>{data.name}</h1>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(data.PokeIndex)+parseInt(Url[Url.length-2])}.png`} alt="Pokemon" />
        <button onClick={handleValue} className='bg-[#031626] w-[150px] h-[35px] rounded-lg opacity-80 text-white'><strong>Info</strong></button>
    </div>
  )
}

export default Card