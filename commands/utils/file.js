const fs = require('fs');
const path = require('path');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    },

    resource_path: (filePath) => {
        return `${this.getCurrentDirectoryBase()}/resources/${filePath}`;
    },

    readFile: (filePath) => {
        return fs.readFileSync(filePath).toString();
    },

    writeFile: (filePath, content) => {
        fs.writeFileSync(filePath, content);
    },

    isDirectory: (path) => {
        return fs.existsSync(path)
    },
    makeDirectory(filePath) {
        fs.mkdirSync(filePath, {
            recursive: false,
            mode: 755
        });
    }
};