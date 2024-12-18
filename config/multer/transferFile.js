import fs from "fs";
import path from "path";
import { errorLogger, infoLogger } from "../logger/logConfig";

// Function to move file to specific folder
export const singleTransfer = (filePath, destinationFolder) => {

    const fileName = path.basename(filePath);
    const newFilePath = path.join(__dirname, "../../public", destinationFolder, fileName);
    const fileUrl = `public/${destinationFolder}/${fileName}`; // the new url of the file

    // Check if the destination folder exists, if not, create it
    if (!fs.existsSync(path.dirname(newFilePath))) {
        fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
    }

    // Move the file to the destination folder
    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            errorLogger.error(`Error moving file: ${err}`);
        } else {
            infoLogger.info(`File moved successfully to ${newFilePath}`);
        }
    });

    return fileUrl;
}

// Function to move files to specific folder
export const multipleTransfer = async (imagePaths, destinationFolder) => {

    const paths = [];

    imagePaths.map((item) => {
        const newPath = singleTransfer(item, destinationFolder);
        paths.push(newPath);
    })

    return paths;
}