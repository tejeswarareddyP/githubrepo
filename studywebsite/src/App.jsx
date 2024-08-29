import React from "react";
import Todos from "./components/Todos"; // Import the Todos component
import Questions from "./components/Questions";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Questions />
    </div>
  );
}

export default App;
