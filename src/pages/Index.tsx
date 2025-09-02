import { useState } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { GameGrid } from "@/components/GameGrid";
import { StatusBar } from "@/components/StatusBar";
import spaceBg from "@/assets/space-bg.jpg";
import pirate from "@/assets/nano-banana-bg.jpeg"

const ResponsiveMinesGame = () => {
  const [minePositions, setMinePositions] = useState(new Set());
  const [gameStarted, setGameStarted] = useState(false);
  
  const generateRandomMines = (count) => {
    const mines = new Set();
    while (mines.size < count) {
      const randomPos = Math.floor(Math.random() * 25);
      mines.add(randomPos);
    }
    return mines;
  };
  
  const handleStartGame = (mineCount) => {
    const newMines = generateRandomMines(mineCount);
    setMinePositions(newMines);
    setGameStarted(true);
  };
  
  const handleTileReveal = (index) => {
    if (minePositions.has(index)) {
      console.log("Mine hit!");
    } else {
      console.log("Safe tile!");
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 flex items-center justify-center p-8 max-[880px]:p-4"
      style={{
        backgroundImage: `url(${spaceBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gray-900/60"></div>
      
      {/* Game Container Card - maintains original desktop sizing */}
      <div className="relative w-full max-w-6xl h-[700px] bg-[#202424] backdrop-blur-sm rounded-lg border flex flex-col overflow-hidden max-[880px]:h-auto max-[880px]:min-h-[500px]">
        {/* Main game content - preserves desktop side-by-side layout */}
        <div className="flex-1 flex max-[880px]:flex-col">
          <ControlPanel onStartGame={handleStartGame} />
          <div className="flex-1 flex items-center justify-center p-6 max-[880px]:p-4 max-[880px]:order-1"
            style={{
                backgroundImage: `url(${pirate})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
            <GameGrid
              minePositions={minePositions}
              onTileReveal={handleTileReveal}
              gameStarted={gameStarted}
            />
          </div>
        </div>
        
        {/* Bottom status bar */}
        <StatusBar />
      </div>
    </div>
  );
};

export default ResponsiveMinesGame;