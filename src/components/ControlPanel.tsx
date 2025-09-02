import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, Info,} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Control Panel Component - maintains original desktop design, responsive only for mobile
const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-6 py-2 text-sm font-medium border-b-2 transition-colors",
      "max-[880px]:px-4 max-[880px]:text-xs",
      active 
        ? "text-green-400 border-green-400" 
        : "text-gray-400 border-transparent hover:text-gray-300"
    )}
  >
    {children}
  </button>
);

const QuickBetButton = ({ amount, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-3 py-1 text-xs rounded border transition-colors",
      "max-[880px]:px-2 max-[880px]:flex-1",
      active 
        ? "bg-green-400 text-black border-green-400" 
        : "bg-gray-700 text-gray-400 border-gray-600 hover:border-green-400"
    )}
  >
    {amount}
  </button>
);

export const ControlPanel = ({ onStartGame }) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [betAmount, setBetAmount] = useState("0");
  const [activeBet, setActiveBet] = useState("1");
  const [mineCount, setMineCount] = useState([4]);

  const quickBets = ["1", "10", "100", "1.0k"];

  return (
    <div className="w-80 bg-[#323738] p-6 border-r border-gray-600 max-[880px]:w-full max-[880px]:border-r-0 max-[880px]:border-b max-[880px]:p-4 max-[880px]:order-2">
      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-600 max-[880px]:mb-4">
        <TabButton 
          active={activeTab === "manual"} 
          onClick={() => setActiveTab("manual")}
        >
          Manual
        </TabButton>
        <TabButton 
          active={activeTab === "auto"} 
          onClick={() => setActiveTab("auto")}
        >
          Auto
        </TabButton>
      </div>

      {/* Amount Section */}
      <div className="mb-6 max-[880px]:mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-300 text-sm font-medium">Amount</span>
          <Info className="w-4 h-4 text-green-400" />
        </div>
        
        <div className="flex items-center gap-2 mb-3 max-[880px]:flex-wrap">
          <div className="flex items-center bg-gray-700 border border-gray-600 rounded px-3 py-2 flex-1">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
            <span className="text-gray-300">{betAmount}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600"
          >
            1/2
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600"
          >
            2×
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600 p-2"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Bet Buttons */}
        <div className="flex gap-2">
          {quickBets.map((amount) => (
            <QuickBetButton
              key={amount}
              amount={amount}
              active={activeBet === amount}
              onClick={() => setActiveBet(amount)}
            />
          ))}
        </div>
      </div>

      {/* Mines Section */}
      <div className="mb-6 max-[880px]:mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-300 text-sm font-medium">Mines</span>
          <span className="text-gray-400 text-sm">24</span>
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <span className="text-gray-300 font-bold text-lg">{mineCount[0]}</span>
          <div className="flex-1">
            <Slider
              value={mineCount}
              onValueChange={setMineCount}
              max={24}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Bet Button */}
      <Button 
        onClick={() => onStartGame(mineCount[0])}
        className="w-full text-black font-semibold bg-gradient-to-r from-[rgba(25,255,121,1)] via-[rgba(25,255,121,1)] to-[rgba(179,226,93,1)] font-medium py-3 text-base"
      >
        Bet
      </Button>

      {/* Demo Mode Notice */}
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
        <Info className="w-4 h-4" />
        <span>Betting with 0 will enter demo mode.</span>
      </div>
    </div>
  );
};