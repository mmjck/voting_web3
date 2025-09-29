import express from "express";
import { failure, success } from "../helpers/httpResponse.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import * as votingService from "../services/voting.js";

const router = express.Router();

router.post(
  "/candidates",
  catchAsync(async (req, res) => {
    if (!req.body?.name) {
      return failure(res, "name is required", 400);
    }

    const txHash = await votingService.addCandidate(req.body.name);
    success(res, { txHash }, 201);
  })
);

router.get(
  "/candidates",
  catchAsync(async (req, res) => {
    const candidates = await votingService.getCandidates();
    success(res, candidates);
  })
);

router.post(
  "/vote",
  catchAsync(async (req, res) => {
    const { candidateId, privateKey } = req.body;

    if (typeof candidateId !== "number") {
      return res.status(400).json({ error: "candidateId must be a number" });
    }

    if (!privateKey) {
      return res.status(400).json({ error: "privateKey is required" });
    }

    const txHash = await votingService.vote(candidateId, privateKey);
    success(res, { txHash });
  })
);

router.get(
  "/winner",
  catchAsync(async (req, res) => {
    const winner = await votingService.getWinner();
    success(res, winner);
  })
);

export default router;
