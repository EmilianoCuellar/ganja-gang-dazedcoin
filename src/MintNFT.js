import { BrowserProvider, Contract, parseEther } from 'ethers';
import React, { useState } from 'react';

function MintNFT() {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState('');
  const contractAddress = '0x11f730d1f7a29F94C15cb1eb0d050B295eA7982b';
  const abi = [ /* Your contract ABI here */ ];

  // Connect wallet function
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum); // Correct for ethers 6.x
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        setStatus('Wallet connected');
      } catch (error) {
        setStatus(`Error connecting wallet: ${error.message}`);
      }
    } else {
      setStatus('MetaMask is not installed');
    }
  };

  // Mint function
  const mintNFT = async () => {
    if (!account) {
      setStatus('Connect your wallet first.');
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, abi, signer);

      const tx = await contract.mint({ value: parseEther('0.1') }); // Update with correct mint logic
      setStatus('Transaction submitted. Waiting for confirmation...');
      await tx.wait();
      setStatus('NFT minted successfully!');
    } catch (error) {
      setStatus(`Error minting NFT: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Mint Your NFT</h1>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
      <button onClick={mintNFT} disabled={!account}>
        Mint NFT
      </button>
      <p>Status: {status}</p>
    </div>
  );
}

export default MintNFT;
