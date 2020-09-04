const fs = require('fs');
const path = require('path');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.join(__dirname, '../../');
    },

    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    },

    resource_path: (filePath) => {
        return path.join(__dirname, '/resources', filePath);
    },

    readFile: (filePath) => {
        filePath = path.join(filePath);
        if (!fs.existsSync(filePath)) {
            throw new Error(`${filePath} not exist`);
        }

        return fs.readFileSync(filePath).toString('utf-8');
    },

    writeFile: (filePath, content) => {
        fs.appendFileSync(filePath, content);
        //fs.writeFileSync(filePath, content);
    },

    isDirectory: (path) => {
        return fs.existsSync(path)
    },
    makeDirectory(filePath) {
        fs.mkdirSync(filePath, {
            recursive: true,
        });
    }
};