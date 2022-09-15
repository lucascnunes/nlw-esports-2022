interface GameBannerProps {
  image: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out">
      <img src={props.image} alt={props.title} />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0">
        <span className="font-bold text-white block">{props.title}</span>
        <span className="text-zinc-300 text-sm block mt-1">{props.adsCount} anúncio{props.adsCount > 1 ? 's' : ''}</span>
      </div>
    </a>
  )
}