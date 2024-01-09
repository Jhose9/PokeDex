import { useState,useEffect } from 'react'
import Card from './Component/Card';
import InfoPoke from './Component/InfoPoke';
import useMiContexto from './Contex';
function App() {
  const [pokemons, setPokemons] = useState([])
  const [InitIndex, setInitIndex] = useState(0)
  const [moreInfo, setMoreInfo] = useState(false)
  const [datosResividos, setDatosResividos] = useState(0)

  const [blur, setBlur] = useState(false)
 
const openBlur=()=>{
  setBlur(true);
}

const CloseBlur=()=>{
  setBlur(false);
}

const DataChildren=(valor)=>{
  setDatosResividos(valor)
}

  const CloseModal=()=>{
    setMoreInfo(false)
  }

  const OpenModal=()=>{
    setMoreInfo(true)
    console.log("hola open modal");
  }


  const NextPage=()=>{
    setInitIndex((prev)=>prev+22)
  }
  const pastPage=()=>{
    setInitIndex((prev)=>prev-22)
  }

  useEffect(() => {
   const handleCall=async()=>{
   try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=21&offset=${InitIndex}`);
    const datos = await response.json();
    setPokemons(datos.results);
   } catch (error) {
    console.error(error)
   }
   }
   handleCall();
  }, [InitIndex])
  
  return (
    <useMiContexto.Provider value={InitIndex}>
      <div className='h-screen bg-[#031626] '>
      <h1 className={`pt-7 text-[55px] text-white text-center ${blur&&"filter blur-lg"}`}>Pokedex</h1>

          <div className={`w-full flex justify-center items-center gap-[800px] ${blur&&"filter blur-lg"}`}>
            <button onClick={pastPage} className='bg-white w-[150px] h-[35px] rounded-lg opacity-80 hover:bg-blue-700 hover:text-white'>Anterior</button>

            <button onClick={NextPage} className='bg-white w-[150px] h-[35px] rounded-lg opacity-80 hover:bg-blue-700 hover:text-white '>Siguiente</button>
          </div>

        <div className={`px-36 py-16 flex-wrap flex gap-14 ${blur&&"filter blur-lg"}`}>
        {/* 21 */}
      {
        pokemons?.map((elemet,index)=>(
          <Card key={index}
          name={elemet.name}
          url={elemet.url}
          PokeIndex={InitIndex}
          openModal={OpenModal}
          fn={DataChildren}
          bluerOpen={openBlur}
          />
        ))
      }
 </div>
      {
        moreInfo && <InfoPoke  bluerClose={CloseBlur} valor={datosResividos} CloseModal={CloseModal}/>
      }

     

    </div>
    </useMiContexto.Provider>
  )
}

export default App
