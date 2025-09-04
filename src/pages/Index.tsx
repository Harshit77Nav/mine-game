import { useState } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { GameGrid } from "@/components/GameGrid";
import { StatusBar } from "@/components/StatusBar";
import spaceBg from "@/assets/space-bg.png";
import pirate from "@/assets/nano-banana-bg.png";
import Header from "@/components/Header";
import IND from "@/assets/INR.rect.png";

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
  const [selectedTiles, setSelectedTiles] = useState<Set<number>>(new Set<number>());

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
    setSelectedTiles(new Set<number>());
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

    const newSelected = new Set(selectedTiles).add(index); 
    setSelectedTiles(newSelected);
    const newRevealed = new Set([...revealedTiles, index]);
    setRevealedTiles(newRevealed);

    if (minePositions.has(index)) {
      const allTiles = new Set<number>(Array.from({ length: 25 }, (_, i) => i));
      setRevealedTiles(allTiles);
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


    const timerId = setTimeout(() => {
      setGameOver(true);
      setShowCashOutPopup(false);
    }, 2000);
    return () => {
      clearTimeout(timerId);
    };
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
        <Header />

      </div>

      <div className="relative w-full max-w-[1200px] h-[700px] bg-[#202424] backdrop-blur-sm rounded-lg border flex flex-col overflow-hidden max-[1000px]:h-auto max-[1000px]:min-h-[650px]">
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
              selectedTiles={selectedTiles}
            />
          </div>
        </div>

        <StatusBar />
      </div>

      {showCashOutPopup && (
        <>
        
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#202424] p-5 rounded-xl border border-[#34393a] max-w-xs w-full text-center shadow-[0_8px_30px_rgba(0,0,0,0.6)]">

              <div className="flex items-center justify-center mb-2 gap-2">

                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-90">
                  <path d="M12 2 L13.5 7 L18 8 L13.5 9.5 L12 14 L10.5 9.5 L6 8 L10.5 7 L12 2Z" fill="#1bff9a" />
                </svg>

                <div className="w-1 h-1 bg-[#1bff9a] rounded-full"></div>
                <div className="w-1 h-1 bg-[#1bff9a] rounded-full"></div>
                <div className="w-1 h-1 bg-[#1bff9a] rounded-full"></div>

                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-90">
                  <path d="M12 2 L13.5 7 L18 8 L13.5 9.5 L12 14 L10.5 9.5 L6 8 L10.5 7 L12 2Z" fill="#1bff9a" />
                </svg>
              </div>

              <div className="text-[28px] md:text-3xl font-extrabold text-[#00f78a] tracking-tight leading-none">
                {multiplier}x
              </div>

              <div className="mx-auto mt-4">
                <div className="inline-flex items-center justify-center gap-3 bg-[#2b3132] border border-[#35393a] rounded-lg px-5 py-2.5 min-w-[170px] shadow-inner">
                  <span className="text-gray-100 font-semibold text-sm">₹{totalCashWon.toFixed(2)}</span>

                  <img src={IND} alt="IND" className="w-5 h-4 rounded-sm object-cover border border-[#2f3435]" />
                </div>
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default ResponsiveMinesGame;