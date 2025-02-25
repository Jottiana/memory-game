import { useState } from "react";
import "../index.css";

const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍓", "🍍", "🥝"];
const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

const MemoryGrid = () => {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    
    setFlipped([...flipped, index]);

    if (flipped.length === 1) {
      const firstIndex = flipped[0];
      if (shuffledSymbols[firstIndex] === shuffledSymbols[index]) {
        setMatched([...matched, firstIndex, index]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {shuffledSymbols.map((symbol, index) => (
        <div
          key={index}
          className={`w-16 h-16 flex items-center justify-center text-2xl font-bold bg-white border rounded shadow 
            cursor-pointer transition-transform transform ${flipped.includes(index) || matched.includes(index) ? "rotate-0" : "rotate-y-180"}`}
          onClick={() => handleCardClick(index)}
        >
          {flipped.includes(index) || matched.includes(index) ? symbol : "❓"}
        </div>
      ))}
    </div>
  );
};

export default MemoryGrid;
