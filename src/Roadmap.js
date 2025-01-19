import React from "react";

const Roadmap = () => {
  return (
    <div className="py-12 px-6 bg-black text-white">
      <h2 className="text-pink text-3xl font-bold mb-4">Our Roadmap</h2>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex-1 p-4 bg-pink text-black rounded-lg shadow-lg mb-4 sm:mb-0">
            <h3 className="text-2xl font-bold">Phase 1: Launch</h3>
            <p className="mt-2">Launch Ganja Gang NFT collection and initial DazedCoin listing.</p>
          </div>
          <div className="flex-1 p-4 bg-pink text-black rounded-lg shadow-lg mb-4 sm:mb-0">
            <h3 className="text-2xl font-bold">Phase 2: Blockchain Expansion</h3>
            <p className="mt-2">Integrate DazedCoin into the cannabis industry ecosystem.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex-1 p-4 bg-pink text-black rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Phase 3: Community Growth</h3>
            <p className="mt-2">Expand the Ganja Gang community and reward users with DazedCoin.</p>
          </div>
          <div className="flex-1 p-4 bg-pink text-black rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Phase 4: Global Reach</h3>
            <p className="mt-2">Achieve worldwide adoption of both Ganja Gang NFTs and DazedCoin.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
