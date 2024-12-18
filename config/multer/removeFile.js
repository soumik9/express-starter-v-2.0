import fs from 'fs';
import { errorLogger, infoLogger } from '../logger/logConfig';

const removeFile = async (imgPath) => {
    if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
        infoLogger.info(`File ${imgPath} deleted successfully`);
    } else {
        errorLogger.error(`File ${imgPath} does not exist`);
    }
}

export default removeFile;