import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GameTileProps {
  isRevealed?: boolean;
  hasMine?: boolean;
  isClicked?: boolean;
  onClick?: () => void;
}

interface GameGridProps {
  minePositions: Set<number>;
  onTileReveal: (index: number) => void;
  gameStarted: boolean;
}

const GameTile = ({ isRevealed, hasMine, isClicked, onClick }) => {
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
      className={cn(
        "w-20 h-20 bg-[#434b4d] hover:bg-[#51595BFF] transition-all duration-150 rounded-lg border",
        "max-[880px]:w-12 max-[880px]:h-12 max-[640px]:w-10 max-[640px]:h-10"
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
          className="absolute inset-0 rounded-lg border border-zinc-700 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="w-full h-full bg-[#434b4d] hover:bg-[#51595BFF] transition-colors duration-150 rounded-lg flex items-center justify-center">
            <span className="text-lg max-[880px]:text-base max-[640px]:text-sm"></span>
          </div>
        </div>
        <div
          className="absolute inset-0 rounded-lg border border-zinc-700 flex items-center justify-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className={cn(
              "w-full h-full flex items-center justify-center rounded-lg transition-colors duration-150",
              showContent && hasMine ? "bg-red-600" : "bg-amber-500"
            )}
          >
            {showContent ? (
              <span className="text-lg max-[880px]:text-base max-[640px]:text-sm">
                {hasMine ? "💣" : "💎"}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
};


export const GameGrid = ({ minePositions, onTileReveal, gameStarted }) => {
  const [revealedTiles, setRevealedTiles] = useState(new Set());
  const [clickedTile, setClickedTile] = useState(null);
  
  const tiles = Array.from({ length: 25 }, (_, index) => index);
  
  useEffect(() => {
    if (gameStarted) {
      setRevealedTiles(new Set());
    }
  }, [gameStarted]);
  
  const handleTileClick = (index) => {
    if (!gameStarted || revealedTiles.has(index)) return;
    
    setClickedTile(index);
    setTimeout(() => setClickedTile(null), 150);
    
    setRevealedTiles(prev => new Set([...prev, index]));
    onTileReveal(index);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-gray-400 text-sm mb-4 max-[880px]:text-xs max-[880px]:text-center">
        {gameStarted ? "Click tiles to reveal!" : "Place your bet to start"}
      </div>
      
      <div className="grid grid-cols-5 gap-4 p-6 bg-[#292d2e] rounded-xl max-[880px]:gap-1 max-[880px]:p-4 max-[640px]:p-3">
        {tiles.map((index) => (
          <GameTile
            key={index}
            isRevealed={revealedTiles.has(index)}
            hasMine={minePositions.has(index)}
            isClicked={clickedTile === index}
            onClick={() => handleTileClick(index)}
          />
        ))}
      </div>
    </div>
  );
};