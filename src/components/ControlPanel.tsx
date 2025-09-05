import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import IND from "@/assets/INR.rect.png";
import { easeIn, easeOut, cubicBezier } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// TabButton, QuickBetButton same as before...
const TabButton = ({ active, children, onClick, disabled }) => (
  <button
    onClick={disabled ? undefined : onClick}
    className={cn(
      "flex-1 py-2 text-sm font-medium transition-colors text-center",
      "max-[1000px]:px-4 max-[1000px]:text-xs",
      active ? "text-white" : "text-gray-400 hover:text-gray-300",
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
      "px-6 -mt-2 py-1.5 text-sm rounded-md font-bold border transition-colors text-center min-w-[56px]",
      "max-[1000px]:px-2 max-[1000px]:flex-1",
      active
        ? "bg-gradient-to-r from-[rgba(25,255,121,0.9)] to-[rgba(179,226,93,0.9)] text-black border-green-400"
        : "bg-[#3a4142] text-gray-300 border-[#363c3d]",
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
  const quickBets = [10, 100, "1.0k", "10.0k"];
  const handleQuickBet = (amount) => {
    let val = 0;
    if(amount == "1.0k"){
      val = 1000;
    } else if(amount == "10.0k"){
      val = 10000;
    } else {
      val = amount;
    }
    setBetAmount(val);
    setActiveBet(val.toString());
  };
  const gemsLeft = 25 - mineCount - safeRevealed;
  const handleHalf = () => setBetAmount(betAmount / 2);
  const handleDouble = () => setBetAmount(betAmount * 2);
  const sliderMin = 1;
  const sliderMax = 24;
  const sliderPercent = ((mineCount - sliderMin) / (sliderMax - sliderMin)) * 100;

  // ---------- animation direction handling ----------
  // direction: 1 means manual -> auto (new pane comes from right),
  // -1 means auto -> manual (new pane comes from left)
  const prevTabRef = useRef(activeTab);
  const [dir, setDir] = useState(1);
  useEffect(() => {
    const prev = prevTabRef.current;
    if (prev !== activeTab) {
      setDir(prev === "manual" && activeTab === "auto" ? 1 : -1);
      prevTabRef.current = activeTab;
    }
  }, [activeTab]);

  const paneVariants = {
    initial: {
      x: "25%",     // always start a bit from the right
      opacity: 0,
      scale: 0.995,
    },
    animate: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.15,
        ease: easeOut,
      },
    },
    exit: {
      x: "-25%",   // always exit to the left
      opacity: 0,
      scale: 0.995,
      transition: {
        duration: 0.15,
        ease: easeIn,
      },
    },
  };

  // ---------- RETURN JSX ----------
  return (
    <div className="min-[1000px]:w-[360px] bg-[#323738] pt-3 border-r border-gray-600 max-[1000px]:w-full max-[1000px]:border-r-0 max-[1000px]:border-b max-[1000px]:p-4 max-[1000px]:order-2">
      <div className="relative border-b border-gray-600 max-[1000px]:mb-4">
        <div className="flex">
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

        {/* underline sits above the gray border and moves between halves */}
        <span
          className={cn(
            "absolute -bottom-[1px] h-[1px] bg-gradient-to-r from-[rgba(25,255,121,0.9)] to-[rgba(179,226,93,0.9)] transition-all duration-300 z-10",
            activeTab === "manual" ? "left-0 w-1/2" : "left-1/2 w-1/2"
          )}
        />
      </div>

      {/* content area: AnimatePresence mounts/unmounts panes with slide+fade */}
      <div className="p-5 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "manual" && (
            <motion.div
              key="manual"
              custom={dir}
              variants={paneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {/* -------- Manual content (same as before) -------- */}
              <div className="mb-4 max-[1000px]:mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-300 text-sm font-medium">Amount</span>
                  <Info className="w-4 h-4 text-green-400" />
                </div>

                <div className="flex items-stretch gap-0 mb-3 min-h-[40px] max-[1000px]:flex-wrap bg-[#292d2e] border border-[#363c3d] rounded-lg overflow-hidden 
                shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
                  <div className="flex items-center px-2 min-h-[36px] bg-[#292d2e]">
                    <span className="text-base">
                      <img src={IND} alt="india" className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="flex-1 flex items-center">
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
                      disabled={isPlaying}
                      className="bg-transparent text-gray-100 w-full outline-none text-base  h-[36px] appearance-none [appearance:textfield]
                       [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-gray-500 font-bold"
                    />
                  </div>

                  <div className="flex items-center bg-[#292d2e]">
                    <button
                      type="button"
                      onClick={handleHalf}
                      disabled={isPlaying}
                      className={cn(
                        "px-3 h-[32px] text-sm font-bold text-gray-200 border mr-1 rounded-md border-[#363c3d] bg-[#3a4142] transition-colors",
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
                        "px-3 h-[32px] text-sm font-bold text-gray-200 border mr-1 rounded-md border-[#363c3d] bg-[#3a4142] transition-colors",
                        isPlaying && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      2×
                    </button>
                    <button
                      type="button"
                      disabled={isPlaying}
                      className={cn(
                        "px-3 h-[32px] text-sm font-bold text-gray-200 border mr-1 rounded-md border-[#363c3d] bg-[#3a4142] transition-colors",
                        isPlaying && "opacity-80 cursor-not-allowed"
                      )}
                    >
                      <ChevronUp className="w-4 h-4 text-white" strokeWidth={3} />
                      <ChevronDown className="w-4 h-4 text-white" strokeWidth={3} />
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

                <div className="flex items-center gap-3 mb-2 bg-[#292d2e] border border-[#363c3d] px-4 py-2 rounded-lg">
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
                    className="w-full text-white font-semibold bg-[#3a4142] hover:bg-[#3d4445] py-4 text-base mb-4"
                  >
                    Pick a Tile Randomly
                  </Button>

                  {safeRevealed > 0 ? (
                    <>
                      <Button
                        onClick={onCashOut}
                        className="w-full text-black font-semibold bg-gradient-to-r from-[#EEA54E] to-[#F6D76F] hover:bg-yellow-300 py-3 text-base mb-4 shadow-[0_0_20px_rgba(238,165,78,0.6)]"
                      >
                        Cash out{" "}
                        <img src={IND} alt="india" className="w-4 h-4 inline-block" /> ₹
                        {(betAmount * multiplier).toFixed(2)}
                      </Button>
                      <div className="flex mb-1 justify-center p-1 rounded-md -mt-3 font-bold items-center gap-2 bg-[#2d4a41] text-xs text-gray-400">
                        <Info className="w-4 h-4" />
                        <span>Betting with 0 will enter demo mode.</span>
                      </div>
                      <div className="mb-0">
                        <span className="text-stone-300 text-sm font-medium">Gems</span>
                        <div className="bg-[#2d3132] border border-[#363c3d] px-3 py-1.5 rounded-md">
                          <span className="text-stone-300 text-md">{gemsLeft}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-stone-300 text-sm font-medium">Total profit ({multiplier}x)</span>
                        <div className="bg-[#2d3132] border border-[#363c3d] px-3 py-1.5 rounded-md">
                          <span className="text-stone-300 text-md">₹{profit.toFixed(2)}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                        <Button
                          disabled
                          className="w-full text-black font-semibold bg-gradient-to-r from-[#EEA54E] to-[#F6D76F] hover:bg-yellow-300 py-3 text-base mb-4 shadow-[0_0_20px_rgba(238,165,78,0.6)]"
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
            </motion.div>
          )}

          {activeTab === "auto" && (
            <motion.div
              key="auto"
              custom={dir}
              variants={paneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {/* Auto pane (unmounted when not active) */}
              <div className="text-gray-400 text-sm">Auto settings coming soon.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};