"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    candidateId: process.env.CROSSMINT_CANDIDATE_ID,
    apiBaseUrl: process.env.CROSSMINT_API_URL,
};
if (!config.candidateId || !config.apiBaseUrl) {
    throw new Error(`Missing required environment variables. 
      Required: CROSSMINT_CANDIDATE_ID, CROSSMINT_API_URL
      Received: ${JSON.stringify(config, null, 2)}`);
}
exports.default = config;
