import * as React from "react";
import { Star, Heart, Send, Volume2, Grid3X3, TrendingUp, Coffee, HelpCircle } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider  } from "./ui/tooltip"; 

export const StatusBar = () => {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-between w-full px-6 py-3 bg-[#292d2e] border-t border-gray-600 max-[1000px]:flex-col max-[1000px]:gap-3 max-[1000px]:px-4 max-[1000px]:py-3 max-[1000px]:order-3">
        <div className="flex items-center gap-6 max-[1000px]:order-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Star className="w-4 h-4 text-green-400 fill-current" />
              </TooltipTrigger>
              <TooltipContent>
                Favorites
              </TooltipContent>
            </Tooltip>
            <span className="text-gray-300 text-sm">5582</span>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Heart className="w-4 h-4 text-green-400 fill-current" />
              </TooltipTrigger>
              <TooltipContent>
                Likes
              </TooltipContent>
            </Tooltip>
            <span className="text-gray-300 text-sm">5845</span>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Send className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              Share
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="text-gray-300 font-medium max-[1000px]:order-1">
          Mines
        </div>

        <div className="flex items-center gap-4 max-[1000px]:order-3 max-[1000px]:gap-3 max-[640px]:flex-wrap max-[640px]:justify-center">
          <Tooltip>
            <TooltipTrigger>
              <div className="w-6 h-6 bg-gray-700 border border-gray-600 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Item 1
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="w-6 h-6 bg-gray-700 border border-gray-600 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Item 2
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Volume2 className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              Mute
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Volume2 className="w-4 h-4 text-green-400 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              Unmute
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Grid3X3 className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              Grid View
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <TrendingUp className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              Stats
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Coffee className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              Coffee Break
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              Help
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};