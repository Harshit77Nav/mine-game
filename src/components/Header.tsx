import { Button } from "@/components/ui/button";
import { Coins, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {

  const navigationItems = [
    { name: "Sports", href: "#sports" },
    { name: "Casino", href: "#casino" },
    { name: "Live", href: "#live" },
    { name: "Promotions", href: "#promotions" },
    { name: "Support", href: "#support" },
  ];

  return (
    <header className="w-full bg-stone-800 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center shadow-gold">
              <Coins className="w-10 p-1 h-10 bg-green-600 rounded-full" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-amber-300 bg-clip-text text-transparent">
                Coin Future
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-gold transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;