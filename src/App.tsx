import { InputToken } from "./components/Token";

export function App() {
  return (
    <div className="w-full h-screen">
      <div className="w-[500px] min-h-32 mx-auto text-center mt-12 space-y-2">
        <header>
          <h1 className="text-2xl leading-relaxed">Token</h1>
        </header>

        <InputToken />
      </div>
    </div>
  );
}

export default App;
