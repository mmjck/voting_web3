import { ethers } from "ethers";
import { abi, address, contract, provider } from "../config/blockchain.js";

export async function addCandidate(name) {
  const tx = await contract.addCandidate(name);
  await tx.wait();
  return tx.hash;
}

export async function getCandidates() {
  const candidates = await contract.getCandidates();

  return candidates.map((c) => ({
    id: Number(c.id),
    name: c.name,
    votes: Number(c.voteCount),
  }));
}

export async function getWinner() {
  const winner = await contract.getWinner();

  return {
    id: Number(winner.id),
    name: winner.name,
    votes: Number(winner.voteCount),
  };
}

export async function vote(candidateId, privateKey) {
  const wallet = new ethers.Wallet(privateKey, provider);
  const userContract = new ethers.Contract(address, abi, wallet);

  const tx = await userContract.vote(candidateId);
  const receipt = await tx.wait();

  return receipt.hash;
}
