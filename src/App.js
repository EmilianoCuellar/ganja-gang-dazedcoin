import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import GanjaGang from "./GanjaGang";
import DazedCoin from "./DazedCoin";
import Team from "./Team";
import Roadmap from "./Roadmap";
import Contact from "./Contact";
import MintNFT from "./MintNFT";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <div className="bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/ganja-gang" element={<GanjaGang />} />
          <Route path="/dazedcoin" element={<DazedCoin />} />
          <Route path="/team" element={<Team />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mintnft" element={<MintNFT />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
