import dotenv from "dotenv";
import { ethers } from "ethers";
import fs from "fs";

// dotenv.config();

const { address, abi } = JSON.parse(
  fs.readFileSync(new URL("Voting.json", import.meta.url))
);
// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
// const owner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
// const contract = new ethers.Contract(address, abi, owner);

// export { contract, owner, provider };

// config/blockchain.js

dotenv.config();

// provider global
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// wallet/contract do dono (admin)
const owner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
const contract = new ethers.Contract(address, abi, owner);

// exporta apenas o que é útil
export { abi, address, contract, owner, provider };
