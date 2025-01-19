import React from 'react';

const features = [
  {
    title: "About the Blockchain",
    feature: "Proof of Product (PoP) Consensus Mechanism",
    description:
      "Proof of Product (PoP) is a consensus mechanism designed to authenticate and verify the existence, authenticity, and movement of physical products in a blockchain network. It bridges the gap between real-world physical items and digital blockchain systems, ensuring transparency, trust, and compliance for industries that rely on accurate product tracking."
  },
  {
    title: "Tokenized Cannabis Strains",
    feature: "Strain Tokenization",
    description:
      "Cannabis strains are tokenized as unique, tradable digital assets on the blockchain. Each tokenized strain represents a specific cannabis product with its unique characteristics, such as THC content, flavor profile, and origin. Users can buy, sell, and trade tokenized strains in a decentralized marketplace, creating a dynamic and transparent market."
  },
  {
    title: "zk-ID Verification",
    feature: "Privacy-Preserving Age Verification",
    description:
      "A zero-knowledge (zk) ID verification system allows customers to prove they meet age requirements without revealing sensitive personal details. This ensures compliance with age regulations while safeguarding user privacy."
  },
  {
    title: "Decentralized Rewards System",
    feature: "Dynamic Reward Distribution",
    description:
      "The blockchain rewards participants (customers and dispensaries) for verifying cannabis products using a dynamic reward system. Features include time-limited rewards, product category weighting, geographical tiers, and event-based bonuses."
  },
  {
    title: "Smart Contract Automation",
    feature: "Automation in Blockchain Ecosystem",
    description:
      "Our smart contracts enable the tokenization of cannabis products, enforce royalty systems, and optimize gas fees to ensure cost-effective blockchain interactions."
  }
];

const FeaturesSection = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          DazedCoin Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 font-bold mb-2">
                Feature: {feature.feature}
              </p>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
