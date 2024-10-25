"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Get current file's directory with ES
// Load .env file
dotenv_1.default.config();
console.log(process.env.CANDIDATE_ID);
console.log(process.env.API_BASE_URL);
const config = {
    candidateId: process.env.CANDIDATE_ID,
    apiBaseUrl: process.env.API_BASE_URL,
};
if (!config.candidateId || !config.apiBaseUrl) {
    throw new Error(`Missing required environment variables. 
      Required: CANDIDATE_ID, API_BASE_URL
      Received: ${JSON.stringify(config, null, 2)}`);
}
exports.default = config;
