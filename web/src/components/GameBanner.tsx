interface GameBannerProps {
  image: string;
  name: string;
  adsCount: number;
}

export function GameBanner({ image, name, adsCount, ...rest }: GameBannerProps) {
  return (
    <a
      {...rest}
      href=""
      className="overflow-hidden relative rounded-lg hover:scale-105 transition duration-300 ease-in-out keen-slider__slide"
    >
      <img
        className="w-auto"
        src={image}
        alt={name}
      />

      <div className="pt-16 pb-4 px-4 bg-game-gradient absolute left-0 bottom-0 right-0">
        <span className="font-bold text-white block">{name}</span>
        <span className="text-zinc-300 text-sm block mt-1">
          {adsCount} anúncio{adsCount > 1 ? "s" : ""}
        </span>
      </div>
    </a>
  );
}
