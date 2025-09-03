import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, Info, } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(' ');

const TabButton = ({ active, children, onClick, disabled }) => (
  <button
    onClick={disabled ? undefined : onClick}
    className={cn(
      "px-6 py-2 text-sm font-medium border-b-2 transition-colors",
      "max-[1000px]:px-4 max-[1000px]:text-xs",
      active 
        ? "text-green-400 border-green-400" 
        : "text-gray-400 border-transparent hover:text-gray-300",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    {children}
  </button>
);

const QuickBetButton = ({ amount, active, onClick, disabled }) => (
  <button
    onClick={disabled ? undefined : onClick}
    className={cn(
      "px-3 py-1 text-xs rounded border transition-colors",
      "max-[1000px]:px-2 max-[1000px]:flex-1",
      active 
        ? "bg-green-400 text-black border-green-400" 
        : "bg-gray-700 text-gray-400 border-gray-600 hover:border-green-400",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    {amount}
  </button>
);

export const ControlPanel = ({ 
  betAmount, 
  setBetAmount, 
  mineCount, 
  setMineCount, 
  gameStarted, 
  gameOver, 
  onStartGame, 
  onPickRandom, 
  onCashOut, 
  multiplier, 
  profit, 
  safeRevealed 
}) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [activeBet, setActiveBet] = useState("1");

  const isPlaying = gameStarted && !gameOver;

  const quickBets = [1, 10, 100, 1000];

  const handleQuickBet = (amount) => {
    setBetAmount(amount);
    setActiveBet(amount.toString());
  };

  const gemsLeft = 25 - mineCount - safeRevealed;

  const handleHalf = () => setBetAmount(betAmount / 2);
  const handleDouble = () => setBetAmount(betAmount * 2);

  return (
    <div className="w-80 bg-[#323738] p-6 border-r border-gray-600 max-[1000px]:w-full max-[1000px]:border-r-0 max-[1000px]:border-b max-[1000px]:p-4 max-[1000px]:order-2">
      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-600 max-[1000px]:mb-4">
        <TabButton 
          active={activeTab === "manual"} 
          onClick={() => setActiveTab("manual")}
          disabled={isPlaying}
        >
          Manual
        </TabButton>
        <TabButton 
          active={activeTab === "auto"} 
          onClick={() => setActiveTab("auto")}
          disabled={isPlaying}
        >
          Auto
        </TabButton>
      </div>

      {activeTab === "manual" && (
        <>
          <div className="mb-6 max-[1000px]:mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-300 text-sm font-medium">Amount</span>
              <Info className="w-4 h-4 text-green-400" />
            </div>
            
            <div className="flex items-center gap-2 mb-3 max-[1000px]:flex-wrap">
              <div className="flex items-center bg-gray-700 border border-gray-600 rounded px-3 py-2 flex-1">
                <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                <input 
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
                  disabled={isPlaying}
                  className="bg-transparent text-gray-300 w-full outline-none disabled:opacity-50"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleHalf}
                disabled={isPlaying}
                className="bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
              >
                1/2
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDouble}
                disabled={isPlaying}
                className="bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
              >
                2×
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600 p-2 disabled:opacity-50"
                disabled={isPlaying}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              {quickBets.map((amount) => (
                <QuickBetButton
                  key={amount}
                  amount={amount}
                  active={activeBet === amount.toString()}
                  onClick={() => handleQuickBet(amount)}
                  disabled={isPlaying}
                />
              ))}
            </div>
          </div>

          <div className="mb-6 max-[1000px]:mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-300 text-sm font-medium">Mines</span>
              <span className="text-gray-400 text-sm">24</span>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <span className="text-gray-300 font-bold text-lg">{mineCount}</span>
              <div className="flex-1">
                <Slider
                  value={[mineCount]}
                  onValueChange={(val) => setMineCount(val[0])}
                  max={24}
                  min={1}
                  step={1}
                  className="w-full"
                  disabled={isPlaying}
                />
              </div>
            </div>
          </div>

          {isPlaying ? (
            <>
              <Button 
                onClick={onPickRandom}
                className="w-full text-white font-semibold bg-gray-600 hover:bg-gray-500 font-medium py-3 text-base mb-4"
              >
                Pick a Tile Randomly
              </Button>
              <Button 
                onClick={onCashOut}
                className="w-full text-black font-semibold bg-yellow-400 hover:bg-yellow-300 font-medium py-3 text-base mb-4"
              >
                Cash out ₹{(betAmount * multiplier).toFixed(2)}
              </Button>
              <div className="mb-4">
                <span className="text-gray-300 text-sm font-medium">Gems</span>
                <div className="text-gray-300 text-lg">{gemsLeft}</div>
              </div>
              <div>
                <span className="text-gray-300 text-sm font-medium">Total profit ({multiplier}x)</span>
                <div className="text-gray-300 text-lg">₹{profit.toFixed(2)}</div>
              </div>
            </>
          ) : (
            <>
              <Button 
                onClick={onStartGame}
                className="w-full text-black font-semibold bg-gradient-to-r from-[rgba(25,255,121,1)] via-[rgba(25,255,121,1)] to-[rgba(179,226,93,1)] font-medium py-3 text-base"
              >
                {gameOver ? "Next Bet" : "Bet"}
              </Button>
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                <Info className="w-4 h-4" />
                <span>Betting with 0 will enter demo mode.</span>
              </div>
            </>
          )}
        </>
      )}

      {activeTab === "auto" && (
        <div /> 
      )}
    </div>
  );
};