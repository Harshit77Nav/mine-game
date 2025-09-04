import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import gems from "../assets/gems.png";
import mines from "../assets/mines.png";
import web from "@/assets/web.png";
import skull from "@/assets/skull.png";

interface GameTileProps {
  isRevealed: boolean;
  hasMine: boolean;
  isClicked: boolean;
  onClick: () => void;
  gameOver: boolean;
  revealedTiles: Set<number>;
  index: number;
  selectedTiles: Set<number>;
}
interface GameGridProps {
  minePositions: Set<number>;
  revealedTiles: Set<number>;
  onTileReveal: (index: number) => void;
  gameStarted: boolean;
  gameOver: boolean;
  selectedTiles: Set<number>;
}

const GameTile: React.FC<GameTileProps> = ({ isRevealed, hasMine, isClicked, onClick, gameOver, revealedTiles, index, selectedTiles }) => {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    if (isRevealed) {
      setShowContent(false);
      const FLIP_DURATION = 500;
      const t = setTimeout(() => {
        setShowContent(true);
      }, FLIP_DURATION);
      return () => clearTimeout(t);
    } else {
      setShowContent(false);
    }
  }, [isRevealed]);

  const rotate = isRevealed ? 180 : 0;
  const scale = isClicked ? 1 : 1.1;
  const transform = `rotateY(${rotate}deg) scale(${scale})`;

  let tileClass = "w-full h-full flex items-center justify-center rounded-lg transition-colors duration-150";
  if (gameOver) {
    if (selectedTiles.has(index)) {
      tileClass += hasMine ? " bg-[#1e2121]" : " bg-[#9243c9]";
    } else {
      tileClass += " bg-[#1e2121] opacity-30";
    }
  } else {
    tileClass += showContent && hasMine ? "bg-[#1e2121]" : " bg-[#9243c9]";
  }

  return (
    <button
      onClick={onClick}
      disabled={gameOver || isRevealed}
      className={cn(
        "w-20 h-20 bg-[#434b4d] hover:bg-[#51595BFF] rounded-lg transition-all duration-150 ",
        "max-[880px]:w-12 max-[880px]:h-12 max-[640px]:w-10 max-[640px]:h-10 max-[1000px]:order-2"
      )}
      style={{ perspective: "1000px" }}
      aria-pressed={!!isRevealed}
    >
      <div
        className="relative w-full h-full rounded-lg transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform,
        }}
      >
        <div
          className="absolute inset-0 rounded-lg flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="w-full h-full bg-[#434b4d] hover:bg-[#51595BFF] rounded-lg transition-colors duration-150 flex items-center justify-center">
            <span className="text-lg max-[880px]:text-base max-[640px]:text-sm"></span>
          </div>
        </div>
        <div
          className="absolute inset-0 flex rounded-lg items-center justify-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className={tileClass}>
            {showContent ? (
              <img
                src={hasMine ? mines : gems}
                alt={hasMine ? "Mine" : "Gem"}
                className="w-18 h-18 max-[1000px]:w-10 max-[1000px]:h-10 max-[640px]:w-8 max-[640px]:h-8"
              />
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
};

export const GameGrid: React.FC<GameGridProps> = ({ minePositions, revealedTiles, onTileReveal, gameStarted, gameOver, selectedTiles }) => {
  const [clickedTile, setClickedTile] = useState<number | null>(null);

  const tiles = Array.from({ length: 25 }, (_, index) => index);

  const handleTileClick = (index: number) => {
    if (!gameStarted || revealedTiles.has(index) || gameOver) return;

    setClickedTile(index);
    setTimeout(() => setClickedTile(null), 150);

    onTileReveal(index);
  };

  return (
    <div className="relative inline-block">
      <div className="grid grid-cols-5 gap-4 p-6 bg-[#292d2e] rounded-lg max-[880px]:gap-2 max-[880px]:p-4 max-[640px]:gap-2 max-[640px]:p-3">
        {tiles.map((index) => (
          <GameTile
            key={index}
            isRevealed={revealedTiles.has(index)}
            hasMine={minePositions.has(index)}
            isClicked={clickedTile === index}
            onClick={() => handleTileClick(index)}
            gameOver={gameOver}
            revealedTiles={revealedTiles}
            index={index}
            selectedTiles={selectedTiles}
          />
        ))}
      </div>

      <img
        src={web}
        alt="crack decoration"
        className={
          "pointer-events-none select-none z-20 absolute " +
          "left-[15px] top-[0px] w-[120px] h-[25px] " +
          "max-[1000px]:left-[12px] max-[1000px]:top-[-8px] max-[1000px]:w-[96px] max-[1000px]:h-[20px] " +
          "max-[640px]:left-[8px] max-[640px]:top-[-6px] max-[640px]:w-[72px] max-[640px]:h-[16px]"
        }
      />

      <img
        src={skull}
        alt="monster decoration"
        className={
          "pointer-events-none select-none z-20 absolute " +
          "right-[12px] top-[-30px] w-[150px] h-[56px] " +
          "max-[1000px]:right-[8px] max-[1000px]:top-[-24px] max-[1000px]:w-[120px] max-[1000px]:h-[44px] " +
          "max-[640px]:right-[6px] max-[640px]:top-[-18px] max-[640px]:w-[96px] max-[640px]:h-[36px]"
        }
      />
    </div>
  );
};
