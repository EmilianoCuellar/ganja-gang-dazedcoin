import React from 'react';

const DazedCoinFeatures = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-12">Explore DazedCoin Features</h2>
        
        {/* About the Blockchain */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">About the Blockchain</h3>
          <p className="text-gray-600 leading-relaxed">
            <strong>Proof of Product (PoP) Consensus Mechanism</strong>: DazedCoin employs PoP, a revolutionary consensus mechanism to authenticate and verify the existence, authenticity, and movement of physical products. This ensures transparency, trust, and compliance for the cannabis industry.
          </p>
        </div>

        {/* Tokenized Cannabis Strains */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tokenized Cannabis Strains</h3>
          <p className="text-gray-600 leading-relaxed">
            Cannabis strains are tokenized as unique digital assets, allowing users to trade them on a decentralized marketplace. Each token represents a specific strain with unique attributes like THC content and origin, bringing liquidity and creating new revenue streams.
          </p>
        </div>

        {/* zk-ID Verification */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">zk-ID Verification</h3>
          <p className="text-gray-600 leading-relaxed">
            DazedCoin integrates zero-knowledge (zk) ID verification, enabling age verification without compromising user privacy. With trusted ID validation, biometric matching, and zero-knowledge proofs, this system ensures compliance and security.
          </p>
        </div>

        {/* Decentralized Rewards System */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Decentralized Rewards System</h3>
          <p className="text-gray-600 leading-relaxed">
            Participants are rewarded for verifying products with a dynamic reward system that includes time-limited rewards, product category weighting, geographical incentives, and event-based bonuses, fostering community engagement.
          </p>
        </div>

        {/* Smart Contract Automation */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Smart Contract Automation</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Automatic minting of DazedCoin when cannabis products are verified through the PoP system.</li>
            <li>Royalty system to benefit product creators, dispensaries, and the network from ongoing sales.</li>
            <li>Optimized gas fees for cost-effective transactions on a large scale.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DazedCoinFeatures;
