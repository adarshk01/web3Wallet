import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SeedPhrase from "./components/SeedPhrase";
import { Dashboard } from "./components/Dashboard";
import { RecoilRoot } from "recoil";
// import { Button } from "@/components/ui/button";

function App() {
  return (
    <RecoilRoot>
      <div className="font-rubik">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/createWallet" />} />
            <Route path="/createWallet" element={<SeedPhrase />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
