"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MegaverseService_1 = __importDefault(require("./services/MegaverseService"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const megaverseService = new MegaverseService_1.default();
        if (process.env.PHASE === "ONE") {
            try {
                console.log('Starting to create polyanet map...');
                yield megaverseService.createDesiredMapPhaseOne();
                console.log('Successfully created polyanet map!');
            }
            catch (error) {
                console.error('Failed to create polyanet map:', error);
                process.exit(1);
            }
        }
        else if (process.env.PHASE === "TWO") {
            try {
                console.log('Starting to create phase two map...');
                yield megaverseService.createDesiredMapPhaseTwo();
                console.log('Successfully created phase two map!');
            }
            catch (error) {
                console.error('Failed to create phase two map:', error);
                process.exit(1);
            }
        }
    });
}
// Immediately invoke main function and handle any unhandled promise rejections
main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
