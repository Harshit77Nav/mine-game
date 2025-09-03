import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GameTileProps {
  isRevealed: boolean;
  hasMine: boolean;
  isClicked: boolean;
  onClick: () => void;
  gameOver: boolean;
}

interface GameGridProps {
  minePositions: Set<number>;
  revealedTiles: Set<number>;
  onTileReveal: (index: number) => void;
  gameStarted: boolean;
  gameOver: boolean;
}

const GameTile: React.FC<GameTileProps> = ({ isRevealed, hasMine, isClicked, onClick, gameOver }) => {
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

  return (
    <button
      onClick={onClick}
      disabled={gameOver || isRevealed}
      className={cn(
        "w-20 h-20 bg-[#434b4d] hover:bg-[#51595BFF] rounded-lg transition-all duration-150 ",
        "max-[1000px]:w-12 max-[1000px]:h-12 max-[640px]:w-10 max-[640px]:h-10"
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
            <span className="text-lg max-[1000px]:text-base max-[640px]:text-sm"></span>
          </div>
        </div>
        <div
          className="absolute inset-0 flex rounded-lg items-center justify-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className={cn(
              "w-full h-full flex items-center rounded-lg justify-center transition-colors duration-150",
              showContent && hasMine ? "bg-red-600" : "bg-amber-500"
            )}
          >
            {showContent ? (
              <span className=" text-5xl max-[1000px]:text-2xl max-[640px]:text-xl">
                {hasMine ? "💣" : "💎"}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
};

export const GameGrid: React.FC<GameGridProps> = ({ minePositions, revealedTiles, onTileReveal, gameStarted, gameOver }) => {
  const [clickedTile, setClickedTile] = useState<number | null>(null);
  
  const tiles = Array.from({ length: 25 }, (_, index) => index);
  
  const handleTileClick = (index: number) => {
    if (!gameStarted || revealedTiles.has(index) || gameOver) return;
    
    setClickedTile(index);
    setTimeout(() => setClickedTile(null), 150);
    
    onTileReveal(index); 
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-gray-400 text-sm mb-4 max-[1000px]:text-xs max-[1000px]:text-center">
        {gameStarted ? (gameOver ? "Game Over!" : "Click tiles to reveal!") : "Place your bet to start"}
      </div>
      
      <div className="grid grid-cols-5 gap-4 p-6 bg-[#292d2e] rounded-lg max-[1000px]:gap-3 max-[1000px]:p-4 max-[640px]:gap-2 max-[640px]:p-3">
        {tiles.map((index) => (
          <GameTile
            key={index}
            isRevealed={revealedTiles.has(index)}
            hasMine={minePositions.has(index)}
            isClicked={clickedTile === index}
            onClick={() => handleTileClick(index)}
            gameOver={gameOver}
          />
        ))}
      </div>
    </div>
  );
};