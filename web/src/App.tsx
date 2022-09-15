import { useState, useEffect } from 'react'
import ReactLoading from "react-loading"

import './styles/main.css'

import logoNlw from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

interface Game {
  id: string;
  title: string;
  banner: string;
  _count: {
    ads: number;
  }
}


function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setTimeout(() => setGames(data), 1200)
      })
  }, [])



  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img className="w-auto" src={logoNlw} alt="Logotipo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.length === 0 ? (
          <div className="col-span-6 my-20">
            <ReactLoading 
              type="spin" 
              color="#fff"
            />
          </div>
        ) : (
          games.map(game => 
            <GameBanner
              key={game.id}
              image={game.banner}
              title={game.title}
              adsCount={game._count.ads}
            />
          ))
        }
      </div>

      <CreateAdBanner />
    </div>
  )
}

export default App