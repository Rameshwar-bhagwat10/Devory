export default function BlockchainProjects() {
  return (
    <div className="text-white/80 leading-relaxed space-y-8">
      <p className="text-xl text-white/90 font-medium">
        Master <strong>blockchain development</strong> with projects ranging from simple smart contracts to 
        complex DeFi applications. This guide covers everything you need to become a blockchain developer.
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Learn Blockchain?</h2>
      <p>
        Blockchain technology is revolutionizing finance, supply chain, healthcare, and more. Blockchain developers 
        are in high demand with competitive salaries and exciting opportunities in Web3.
      </p>

      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 my-8">
        <h3 className="text-xl font-bold text-white mb-3">What You&apos;ll Learn</h3>
        <ul className="space-y-2 text-white/70">
          <li>✓ Solidity programming</li>
          <li>✓ Smart contract development</li>
          <li>✓ Web3.js and Ethers.js</li>
          <li>✓ DeFi protocols and dApps</li>
          <li>✓ NFT development</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Beginner Blockchain Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">1. Simple Token (ERC-20)</h3>
      <p>
        Create your first cryptocurrency token on Ethereum. Learn Solidity basics, token standards, and how to 
        deploy smart contracts.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Solidity, Hardhat, Ethers.js, React
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">2. NFT Collection</h3>
      <p>
        Build and deploy an NFT collection with minting functionality. Learn about ERC-721 standard, IPFS storage, 
        and metadata management.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Solidity, OpenZeppelin, IPFS, Next.js
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Intermediate Blockchain Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">3. Decentralized Marketplace</h3>
      <p>
        Create a peer-to-peer marketplace where users can buy and sell items using cryptocurrency. Implement 
        escrow functionality and dispute resolution.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Solidity, Web3.js, React, IPFS, The Graph
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">4. DAO (Decentralized Autonomous Organization)</h3>
      <p>
        Build a DAO with voting mechanisms, proposal creation, and treasury management. Learn about governance 
        and decentralized decision-making.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Solidity, Snapshot, Aragon, React
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Advanced Blockchain Projects</h2>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">5. DeFi Lending Protocol</h3>
      <p>
        Create a decentralized lending and borrowing platform similar to Aave or Compound. Implement interest 
        rates, collateralization, and liquidation mechanisms.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Solidity, Chainlink Oracles, The Graph, React, Web3.js
      </p>

      <h3 className="text-2xl font-bold text-white mt-8 mb-4">6. Cross-Chain Bridge</h3>
      <p>
        Build a bridge to transfer assets between different blockchains. Learn about cross-chain communication, 
        validators, and security considerations.
      </p>
      <p className="text-white/60 text-sm mt-2">
        <strong>Tech Stack:</strong> Solidity, Cosmos SDK, Polkadot, Rust
      </p>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Essential Tools</h2>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Development:</strong> Hardhat, Truffle, Remix IDE</li>
        <li><strong>Testing:</strong> Waffle, Ganache, Foundry</li>
        <li><strong>Frontend:</strong> Web3.js, Ethers.js, Wagmi</li>
        <li><strong>Storage:</strong> IPFS, Arweave, Filecoin</li>
        <li><strong>Indexing:</strong> The Graph, Moralis</li>
      </ul>

      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
      <p>
        Blockchain development offers exciting opportunities in the rapidly growing Web3 ecosystem. Start with 
        simple smart contracts, progress to dApps, and eventually build complex DeFi protocols.
      </p>
    </div>
  );
}
