import dotenv from 'dotenv';
import { Config } from '../interfaces/interfaces';

dotenv.config();

const config = {
    candidateId: process.env.CROSSMINT_CANDIDATE_ID,
    apiBaseUrl: process.env.CROSSMINT_API_URL,
  } as Config;


  if (!config.candidateId || !config.apiBaseUrl) {
    throw new Error(
      `Missing required environment variables. 
      Required: CROSSMINT_CANDIDATE_ID, CROSSMINT_API_URL
      Received: ${JSON.stringify(config, null, 2)}`
    );
  }

  export default config;


