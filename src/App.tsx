import { useState } from "react";
import "./index.css";
import MemoryGrid from "./components/MemoryGrid.tsx";

function App() {
  const [isRTL, setIsRTL] = useState(false);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <button type="button"
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => setIsRTL(!isRTL)}
      >
        {isRTL ? "Switch to LTR" : "Passer en RTL"}
      </button>
      <MemoryGrid />
    </div>
  );
}

export default App;
