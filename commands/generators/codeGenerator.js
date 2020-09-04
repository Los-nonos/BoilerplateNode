const FileExistException = require("../Exceptions/FileExistException");

const file = require('../utils/file');


const buildActionFilePath = (action, grouping, isCommand) => {
    const path = `${file.getCurrentDirectoryBase()}src/Presentation/Http/Actions/${grouping}/${action}${grouping}Action.ts`;

    if (file.directoryExists(path)) {
        throw new FileExistException(path);
    }

    return path;
}

const buildAdapterFilePath = (action, grouping) => {
    const path = `${file.getCurrentDirectoryBase()}src/Presentation/Http/Adapters/${grouping}/${action}${grouping}Adapter.ts`;

    if (file.directoryExists(path)) {
        throw new FileExistException(path);
    }

    return path;
}

const buildInputFilePath = (action, grouping, isCommand) => {
    let path = '';
    if (isCommand) {
        path = `${file.getCurrentDirectoryBase()}src/Application/Commands/Command/${grouping}/${action}${grouping}Command.ts`;
    }else {
        path = `${file.getCurrentDirectoryBase()}src/Application/Queries/Query/${grouping}/${action}${grouping}Query.ts`;
    }

    if (file.directoryExists(path)) {
        throw new FileExistException(path);
    }

    return path;
}

const buildHandlerFilePath = (action, grouping, isCommand) => {
    let path = '';
    if (isCommand) {
        path = `${file.getCurrentDirectoryBase()}src/Application/Commands/Handler/${grouping}/${action}${grouping}Handler.ts`;
    }else {
        path = `${file.getCurrentDirectoryBase()}src/Application/Queries/Handler/${grouping}/${action}${grouping}Handler.ts`;
    }

    if (file.directoryExists(path)) {
        throw new FileExistException(path);
    }

    return path;
}

const buildResultFilePath = (action, grouping) => {
    const path = `${file.getCurrentDirectoryBase()}/src/Application/Queries/Results/${grouping}/${action}${grouping}Result.ts`;

    if (file.directoryExists(path)) {
        throw new FileExistException(path);
    }

    return path;
}

const buildActionClass = (action, grouping, isCommand) => {
    const stub = isCommand ? file.resource_path('/stubs/ActionForCommand.stub') : file.resource_path('/stubs/ActionForQuery.stub');

    let stubContent = file.readFile(stub);

    stubContent = stubContent.replace(/{{action}}/gi, action);
    stubContent = stubContent.replace(/{{grouping}}/gi, grouping);

    return stubContent;
}

const buildAdapterClass = (action, grouping, isCommand) => {
    const stub = isCommand ? file.resource_path('/stubs/CommandHttpAdapter.stub') : file.resource_path('/stubs/QueryHttpAdapter.stub');

    let stubContent = file.readFile(stub);

    stubContent = stubContent.replace(/{{action}}/gi, action);
    stubContent = stubContent.replace(/{{grouping}}/gi, grouping);

    return stubContent;
}

const buildInputClass = (action, grouping, attributes, isCommand) => {
    attributes = attributes.trim();
    attributes = attributes.split(',');

    let classAttributes = '';

    let constructorParameters = '';
    let constructorAssignment = '';

    let getMethods = '';

    for (const attribute of attributes) {
        let name = attribute.split('-')[0];
        let type = attribute.split('-')[1];

        classAttributes += `    private ${name} ${isNullable(type) ? '?:' : ':'} ${isNullable(type) ? type.slice(1) : type}; \n`;

        constructorParameters += `        ${name}${isNullable(type) ? '?:' : ':'} ${isNullable(type) ? type.slice(1) : type} ${isLastElement(attribute, attributes) ? '' : ",\n"}`
        constructorAssignment += `        this.${name} = ${name}${isLastElement(attribute, attributes) ? ';' : ';\n'}`

        getMethods += isFirstElement(attribute, attributes) ? '\n' : "\n\n";
        getMethods += `    public get${name.charAt(0).toUpperCase() + name.slice(1)}(): ${isNullable(type) ? type.slice(1) : type} \n`
        getMethods += `    {\n`;
        getMethods += `        return this.${name};\n`;
        getMethods += `    }`
    }


    const stub = isCommand ? file.resource_path('/stubs/Command.stub') : file.resource_path('/stubs/Query.stub');

    let stubContent = file.readFile(stub);

    stubContent = stubContent.replace(/{{grouping}}/gi, grouping);
    stubContent = stubContent.replace(/{{action}}/gi, action);
    stubContent = stubContent.replace(/{{class_attributes}}/gi, classAttributes);
    stubContent = stubContent.replace(/{{constructor_parameters}}/gi, constructorParameters);
    stubContent = stubContent.replace(/{{constructor_assignments}}/gi, constructorAssignment);
    stubContent = stubContent.replace(/{{get_methods}}/gi, getMethods);

    return stubContent;
}

const buildHandlerClass = (action, grouping, isCommand) => {
    const stub = isCommand ? file.resource_path('/stubs/CommandHandler.stub') : file.resource_path('/stubs/QueryHandler.stub');

    let stubContent = file.readFile(stub);

    stubContent = stubContent.replace(/{{action}}/gi, action);
    stubContent = stubContent.replace(/{{grouping}}/gi, grouping);

    return stubContent;
}

const buildResultClass = (action, grouping) => {
    const stub = file.resource_path('/stubs/QueryResult.stub');

    let stubContent = file.readFile(stub);

    stubContent = stubContent.replace(/{{action}}/gi, action);
    stubContent = stubContent.replace(/{{grouping}}/gi, grouping);

    return stubContent;
}

const isNullable = type => {
    return type.includes('?');
}

const isLastElement = (index, attributes) => {
    return attributes[attributes.length - 1] === index;
}

const isFirstElement = (index, attributes) => {
    return attributes[0] === index;
}

const makeDirectory = filePath => {
    filePath = filePath.slice(0, filePath.lastIndexOf('/'))
    if (!file.isDirectory(filePath)) {
        file.makeDirectory(filePath);
    }
}

const fileSystemPut = (filePath, fileClass) => {
    file.writeFile(filePath, fileClass);
}

module.exports = {
    buildActionFilePath,
    buildAdapterFilePath,
    buildInputFilePath,
    buildHandlerFilePath,
    buildResultFilePath,
    buildActionClass,
    buildAdapterClass,
    buildHandlerClass,
    buildInputClass,
    buildResultClass,
    makeDirectory,
    fileSystemPut
};