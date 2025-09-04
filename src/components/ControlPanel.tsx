import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, Info } from "lucide-react";
import IND from "@/assets/INR.rect.png"

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
      "px-3 py-1 text-xs rounded-md border transition-colors text-center min-w-[56px]",
      "max-[1000px]:px-2 max-[1000px]:flex-1",
      active
        ? "bg-gradient-to-r from-[rgba(25,255,121,0.9)] to-[rgba(179,226,93,0.9)] text-black border-green-400"
        : "bg-[#2d3132] text-gray-400 border-[#363c3d] hover:border-green-400",
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
  const [activeBet, setActiveBet] = useState("");

  const isPlaying = gameStarted && !gameOver;

  const quickBets = [1, 10, 100, 1000];

  const handleQuickBet = (amount) => {
    setBetAmount(amount);
    setActiveBet(amount.toString());
  };

  const gemsLeft = 25 - mineCount - safeRevealed;

  const handleHalf = () => setBetAmount(betAmount / 2);
  const handleDouble = () => setBetAmount(betAmount * 2);

  const sliderMin = 1;
  const sliderMax = 24;
  const sliderPercent = ((mineCount - sliderMin) / (sliderMax - sliderMin)) * 100;

  return (
    <div className="min-[1000px]:w-[360px] bg-[#323738] p-6 border-r border-gray-600 max-[1000px]:w-full max-[1000px]:border-r-0 max-[1000px]:border-b max-[1000px]:p-4 max-[1000px]:order-2">

      <div className="flex justify-evenly mb-6 border-b border-gray-600 max-[1000px]:mb-4">
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

            <div className="flex items-stretch gap-0 mb-3 max-[1000px]:flex-wrap bg-[#232728] border border-[#363c3d] rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.10)]">

              <div className="flex items-center px-4 min-h-[36px] border-r border-[#363c3d] bg-[#232728]">
                <span className="text-base"><img src={IND} alt="india" className="w-4 h-4"/></span>
              </div>

              <div className="flex-1 flex items-center">
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
                  disabled={isPlaying}
                  className="bg-transparent text-gray-100 w-full outline-none text-base px-4 h-[36px] appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-gray-500 font-semibold"
                />
              </div>

              <div className="flex items-center bg-[#232728]">
                <button
                  type="button"
                  onClick={handleHalf}
                  disabled={isPlaying}
                  className={cn(
                    "px-4 h-[36px] text-xs text-gray-300 border-l border-[#363c3d] hover:bg-[#232728]/80 transition-colors",
                    isPlaying && "opacity-50 cursor-not-allowed"
                  )}
                >
                  1/2
                </button>
                <button
                  type="button"
                  onClick={handleDouble}
                  disabled={isPlaying}
                  className={cn(
                    "px-4 h-[36px] text-xs text-gray-300 border-l border-[#363c3d] hover:bg-[#232728]/80 transition-colors",
                    isPlaying && "opacity-50 cursor-not-allowed"
                  )}
                >
                  2×
                </button>
                <button
                  type="button"
                  disabled={isPlaying}
                  className={cn(
                    "px-4 h-[36px] text-xs text-gray-300 border-l border-[#363c3d] hover:bg-[#232728]/80 transition-colors",
                    isPlaying && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
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
              
            </div>

            <div className="flex items-center gap-3 mb-2 bg-[#232728] border border-[#363c3d] px-4 py-2 rounded-lg">
              <span className="text-gray-300 font-bold text-md">{mineCount}</span>

              <div className="flex-1 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
                <Slider
                  value={[mineCount]}
                  onValueChange={(val) => setMineCount(val[0])}
                  max={sliderMax}
                  min={sliderMin}
                  step={1}
                  className="w-full custom-slider-range"
                  style={{ backgroundSize: `${sliderPercent}% 100%` }}
                  disabled={isPlaying}
                />
              </div>
              <span className="text-gray-300 font-bold text-md">24</span>
            </div>
          </div>

          {isPlaying ? (
            <>
              <Button
                onClick={onPickRandom}
                className="w-full text-white font-semibold bg-gray-600 hover:bg-gray-500 py-3 text-base mb-4"
              >
                Pick a Tile Randomly
              </Button>

              {safeRevealed > 0 ? (
                <>
                  <Button
                    onClick={onCashOut}
                    className="w-full text-black font-semibold bg-gradient-to-r from-[#EEA54E] to-[#F6D76F] hover:bg-yellow-300 py-3 text-base mb-4"
                  >
                    Cash out ₹{(betAmount * multiplier).toFixed(2)}
                  </Button>
                  <div className="flex justify-center p-1 rounded-md -mt-3 font-bold items-center gap-2 bg-[#2d4a41] text-xs text-gray-400">
                    <Info className="w-4 h-4" />
                    <span>Betting with 0 will enter demo mode.</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-stone-300 text-sm font-small">Gems</span>
                    <div className="bg-[#2d3132] border border-[#363c3d] px-3 py-1 rounded-md">
                      <span className="text-stone-300 text-md">{gemsLeft}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-300 text-sm font-small">Total profit ({multiplier}x)</span>
                    <div className="bg-[#2d3132] border border-[#363c3d] px-3 py-1 rounded-md">
                      <span className="text-stone-300 text-md">₹{profit.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    disabled
                    className="w-full text-stone-900 font-semibold bg-gradient-to-r from-[#EEA54E] to-[#F6D76F] py-3 text-base mb-4"
                  >
                    Cash out
                  </Button>
                  <div className="flex justify-center p-1 rounded-md -mt-3 font-bold items-center gap-2 bg-[#2d4a41] text-xs text-gray-400">
                    <Info className="w-4 h-4" />
                    <span>Betting with 0 will enter demo mode.</span>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={onStartGame}
                className="w-full text-black font-semibold bg-gradient-to-r from-[rgba(25,255,121,1)] via-[rgba(25,255,121,1)] to-[rgba(179,226,93,1)] py-3 text-base"
              >
                {gameOver ? "Next Bet" : "Bet"}
              </Button>
              <div className="flex justify-center p-1 rounded-md mt-1 font-bold items-center gap-2 bg-[#2d4a41] text-xs text-gray-400">
                <Info className="w-4 h-4" />
                <span>Betting with 0 will enter demo mode.</span>
              </div>
            </>
          )}
        </>
      )}

      {activeTab === "auto" && <div></div>}
    </div>
  );
};
