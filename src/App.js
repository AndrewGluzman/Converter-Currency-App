import "./App.css";
import CurrencyApp from "./converterComps/currencyApp";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <ToastProvider>
      <div className="App">
        <CurrencyApp />
      </div>
    </ToastProvider>
  );
}

export default App;
