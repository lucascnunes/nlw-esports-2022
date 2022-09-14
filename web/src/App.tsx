import { MagnifyingGlassPlus } from 'phosphor-react'

import './styles/main.css'

import logoNlw from './assets/logo-nlw-esports.svg'

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img className="w-auto" src={logoNlw} alt="Logotipo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-1.png" alt="Jogo 1" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0">
            <span className="font-bold text-white block">League of Legends</span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-2.png" alt="Jogo 2" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0">
            <span className="font-bold text-white block">Dota 2</span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-3.png" alt="Jogo 3" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0">
            <span className="font-bold text-white block">CS:GO</span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-4.png" alt="Jogo 4" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0">
            <span className="font-bold text-white block">Apex Legends</span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-5.png" alt="Jogo 5" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0">
            <span className="font-bold text-white block">Fortnite</span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-6.png" alt="Jogo 6" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0">
            <span className="font-bold text-white block">New World</span>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
      </div>

      <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <span className="text-2xl font-black text-white block">Não encontrou seu duo?</span>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>
          <button className="py-3 px-4 text-white rounded-md bg-violet-500 hover:bg-violet-600 flex items-center gap-3">
            <MagnifyingGlassPlus size="24" />Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App