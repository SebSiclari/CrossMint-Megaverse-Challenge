import { MegaverseService } from "./services/MegaverseService";
import { PolyanetsAPI } from "./api/PolyanetsAPI";
import { SoloonsAPI } from "./api/SoloonsAPI";
import { ComethAPI } from "./api/ComethAPI";
import { config } from "./config/config";
import { axiosInstance } from "./http/axios-instance";
import dotenv from 'dotenv';

dotenv.config();

async function main(): Promise<void> {

   const defaultServiceConfig = {
        ...config,
        axiosInstance
    }

    const megaverseService = new MegaverseService(defaultServiceConfig,
        new PolyanetsAPI(defaultServiceConfig),
        new SoloonsAPI(defaultServiceConfig),
        new ComethAPI(defaultServiceConfig),
    );

    if (process.env.PHASE === "ONE") {
    try {
        console.log('Starting to create polyanet map...');
        await megaverseService.createDesiredMapPhaseOne();
        console.log('Successfully created polyanet map!');
    } catch (error) {
        console.error('Failed to create polyanet map:', error);
            process.exit(1);
        }
    } else if (process.env.PHASE === "TWO") {
        try {
            console.log('Starting to create phase two map...');
            await megaverseService.createDesiredMapPhaseTwo();
            console.log('Successfully created phase two map!');
        } catch (error) {
            console.error('Failed to create phase two map:', error);
            process.exit(1);
        }
    }
}

main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});