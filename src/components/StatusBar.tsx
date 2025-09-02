import { Star, Heart, Send, Volume2, Grid3X3, TrendingUp, Coffee, HelpCircle } from "lucide-react";

export const StatusBar = () => {
  return (
    <div className="flex items-center justify-between w-full px-6 py-3 bg-[#292d2e] border-t border-gray-600 max-[880px]:flex-col max-[880px]:gap-3 max-[880px]:px-4 max-[880px]:py-3 max-[880px]:order-3">
      {/* Left side stats */}
      <div className="flex items-center gap-6 max-[880px]:order-2">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-green-400 fill-current" />
          <span className="text-gray-300 text-sm">5582</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-green-400 fill-current" />
          <span className="text-gray-300 text-sm">5845</span>
        </div>
        <Send className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
      </div>

      {/* Center game name */}
      <div className="text-gray-300 font-medium max-[880px]:order-1">
        Mines
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4 max-[880px]:order-3 max-[880px]:gap-3 max-[640px]:flex-wrap max-[640px]:justify-center">
        <div className="w-6 h-6 bg-gray-700 border border-gray-600 rounded flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
        </div>
        <div className="w-6 h-6 bg-gray-700 border border-gray-600 rounded flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
        </div>
        <Volume2 className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
        <Volume2 className="w-4 h-4 text-green-400 cursor-pointer" />
        <Grid3X3 className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
        <TrendingUp className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
        <Coffee className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
      </div>
    </div>
  );
};