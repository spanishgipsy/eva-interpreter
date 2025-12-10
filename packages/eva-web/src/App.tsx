import './App.css';
import EditorPane from "./components/EditorPane/EditorPane.tsx";
import ConsolePane from "./components/ConsolePane/ConsolePane.tsx";
import VisualizerPane from "./components/VisualizerPane/VisualizerPane.tsx";

function App() {
  return (
    <div className="grid grid-rows-[minmax(0,1fr)_minmax(0,1fr)] h-screen gap-2 p-2 bg-eva-bg">
      <EditorPane className="row-span-1" />
      <div className="grid grid-cols-2 gap-2 row-span-1">
        <ConsolePane />
        <VisualizerPane />
      </div>
    </div>
  );
}

export default App
