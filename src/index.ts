import MegaverseService from "./services/MegaverseService";
import dotenv from 'dotenv';

dotenv.config();

async function main(): Promise<void> {
    const megaverseService = new MegaverseService();
    try {
        console.log('Starting to create polyanet map...');
        await megaverseService.createDesiredMapPhaseOne();
        console.log('Successfully created polyanet map!');
    } catch (error) {
        console.error('Failed to create polyanet map:', error);
        process.exit(1);
    }
}

// Immediately invoke main function and handle any unhandled promise rejections
main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});