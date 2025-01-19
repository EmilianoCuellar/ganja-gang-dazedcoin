import React from "react";
import GanjaGang from "./MintNFT";
import DazedCoin from "./components/DazedCoin";
import Footer from "./components/Footer";
import Roadmap from "./Roadmap";
import Contact from "./Contact";


const Homepage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="py-12 text-center">
        <h1 className="text-pink text-4xl font-bold">Welcome to Ganja Gang & DazedCoin</h1>
        <p className="mt-4">Revolutionizing cannabis and blockchain technology.</p>
      </header>

      <GanjaGang />
      <DazedCoin />

      <section className="py-12 px-6">
        <h2 className="text-2xl text-pink font-bold mb-4">Featured Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink p-4 text-black">Image/Video Placeholder 1</div>
          <div className="bg-pink p-4 text-black">Image/Video Placeholder 2</div>
        </div>
      </section>

      <Roadmap />
      <Contact />

      <Footer />
    </div>
  );
};

export default Homepage;