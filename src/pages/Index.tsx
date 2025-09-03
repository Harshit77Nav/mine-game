import { useState } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { GameGrid } from "@/components/GameGrid";
import { StatusBar } from "@/components/StatusBar";
import spaceBg from "@/assets/space-bg.png";
import pirate from "@/assets/nano-banana-bg.jpeg";
import Header from "@/components/Header";

const RTP = 0.96;
const ResponsiveMinesGame = () => {
  const [minePositions, setMinePositions] = useState<Set<number>>(new Set<number>());
  const [revealedTiles, setRevealedTiles] = useState<Set<number>>(new Set<number>());
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [profit, setProfit] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [mineCount, setMineCount] = useState(4);
  const [safeRevealed, setSafeRevealed] = useState(0);
  const [showCashOutPopup, setShowCashOutPopup] = useState(false); 

  const generateRandomMines = (count: number): Set<number> => {
    const mines = new Set<number>();
    while (mines.size < count) {
      const randomPos = Math.floor(Math.random() * 25);
      mines.add(randomPos);
    }
    return mines;
  };

  const handleStartGame = () => {
    const newMines = generateRandomMines(mineCount);
    setMinePositions(newMines);
    setGameStarted(true);
    setGameOver(false);
    setRevealedTiles(new Set<number>());
    setMultiplier(1);
    setProfit(0);
    setSafeRevealed(0);
  };

  const calculateMultiplier = (k: number, m: number): number => {
    if (k === 0) return 1;
    const n = 25;
    const s = n - m;
    let prod = 1;
    for (let i = 0; i < k; i++) {
      prod *= (n - i) / (s - i);
    }
    return parseFloat((RTP * prod).toFixed(2));
  };

  const handleTileReveal = (index: number) => {
    if (gameOver || !gameStarted || revealedTiles.has(index)) return;

    const newRevealed = new Set([...revealedTiles, index]);
    setRevealedTiles(newRevealed);

    if (minePositions.has(index)) {
      setGameOver(true);
      setMultiplier(0);
      setProfit(-betAmount);
    } else {
      const k = safeRevealed + 1;
      setSafeRevealed(k);
      const newMulti = calculateMultiplier(k, minePositions.size);
      setMultiplier(newMulti);
      setProfit(betAmount * (newMulti - 1));
    }
  };

  const handlePickRandom = () => {
    if (gameOver || !gameStarted) return;
    const unrevealed = Array.from({ length: 25 }, (_, i) => i).filter(i => !revealedTiles.has(i));
    if (unrevealed.length === 0) return;
    const randIndex = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    handleTileReveal(randIndex);
  };

  const handleCashOut = () => {
    if (gameOver || !gameStarted) return;
    setShowCashOutPopup(true); 
  };

  const confirmCashOut = () => {
    setGameOver(true);
    setShowCashOutPopup(false);
  };

  const cancelCashOut = () => {
    setShowCashOutPopup(false);
  };

  const totalCashWon = betAmount * multiplier;

  return (
    <div 
      className="min-h-screen bg-gray-900 flex flex-wrap  justify-center  "
      style={{
        backgroundImage: `url(${spaceBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className=" w-full ">
      <Header/>

       </div>
      
      <div className="relative w-full max-w-6xl h-[700px] bg-[#202424] backdrop-blur-sm rounded-lg border flex flex-col overflow-hidden max-[1000px]:h-auto max-[1000px]:min-h-[500px]">
        <div className="flex-1 flex max-[1000px]:flex-col">
          <ControlPanel 
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            mineCount={mineCount}
            setMineCount={setMineCount}
            gameStarted={gameStarted}
            gameOver={gameOver}
            onStartGame={handleStartGame}
            onPickRandom={handlePickRandom}
            onCashOut={handleCashOut}
            multiplier={multiplier}
            profit={profit}
            safeRevealed={safeRevealed}
          />
          <div className="flex-1 flex items-center justify-center p-6 max-[1000px]:p-4 max-[1000px]:order-1"
            style={{
              backgroundImage: `url(${pirate})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}>
            <GameGrid
              minePositions={minePositions}
              revealedTiles={revealedTiles}
              onTileReveal={handleTileReveal}
              gameStarted={gameStarted}
              gameOver={gameOver}
            />
          </div>
        </div>
        
        <StatusBar />
      </div>

      {showCashOutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#202424] p-6 rounded-lg border border-gray-600 max-w-md w-full text-center">
            <h2 className="text-xl text-gray-300 mb-4">Cash Out Confirmation</h2>
            <p className="text-gray-400 mb-2">Multiplier: {multiplier}x</p>
            <p className="text-gray-400 mb-4">Total Cash Won: ₹{totalCashWon.toFixed(2)}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmCashOut}
                className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
              >
                Confirm
              </button>
              <button
                onClick={cancelCashOut}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Play More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveMinesGame;