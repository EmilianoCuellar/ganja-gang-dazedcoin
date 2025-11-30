# Ganja Gang → Dazed Blockchain Migration

## Why migrate
- Lower fees on Dazed chain
- Native $DAZED token utility
- Native cannabis enterprise integrations

## How it works (phase I)
1. Users hold Ganja Gang NFT on Ethereum.
2. At scheduled migration event (~Q2 ’26), you connect wallet and click “Migrate”.
3. Smart contract burns or locks the ETH ERC-721 token.
4. Parallel Dazed chain mints equivalent token for your wallet.
5. All historical metadata, traits, and membership tiers migrate.

## Developer steps
- Register your wallet on Dazed Bridge.
- Approve `bridgeContract.burnOrLock( tokenId )`
- Listen for event `BridgeLocked(tokenId, owner)`
- Poll event, then call `dazedMint(owner, tokenId)` on Dazed chain via RPC RPC_URL.

## FAQs
- What happens to royalties on Ethereum? …
