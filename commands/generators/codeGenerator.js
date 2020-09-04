const FileExistException = require("../Exceptions/FileExistException");

const file = require('../utils/file');


const buildActionFilePath = (action, grouping, isCommand) => {
    const path = `${file.getCurrentDirectoryBase()}/Presentation/Http/Actions/${grouping}/${action}${grouping}Action.ts`;

    if (file.directoryExists(path)) {
        throw new FileExistException(path);
    }

    return path;
}

const buildAdapterFilePath = (action, grouping) => {
    const path = `${file.getCurrentDirectoryBase()}/Presentation/Http/Adapters/${grouping}/${action}${grouping}Adapter.ts`;

    if (file.directoryExists(path)) {
        throw new FileExistException(path);
    }

    return path;
}

const buildInputFilePath = (action, grouping, isCommand) => {
    let path = '';
    if (isCommand) {
        path = `${file.getCurrentDirectoryBase()}/Application/Commands/Command/${grouping}/${action}${grouping}Command.ts`;
    }else {
        path = `${file.getCurrentDirectoryBase()}/Application/Queries/Query/${grouping}/${action}${grouping}Query.ts`;
    }

    if (file.directoryExists(path)) {
        throw new FileExistException(path);
    }

    return path;
}

const buildHandlerFilePath = (action, grouping, isCommand) => {
    let path = '';
    if (isCommand) {
        path = `${file.getCurrentDirectoryBase()}/Application/Commands/Handler/${grouping}/${action}${grouping}Handler.ts`;
    }else {
        path = `${file.getCurrentDirectoryBase()}/Application/Queries/Handler/${grouping}/${action}${grouping}Handler.ts`;
    }

    if (file.directoryExists(path)) {
        throw new FileExistException(path);
    }

    return path;
}

const buildResultFilePath = (action, grouping) => {
    const path = `${file.getCurrentDirectoryBase()}/Application/Queries/Results/${grouping}/${action}${grouping}Result.ts`;

    if (file.directoryExists(path)) {
        throw new FileExistException(path);
    }

    return path;
}

const buildActionClass = (action, grouping, isCommand) => {
    const stub = isCommand ? file.resource_path('/stubs/ActionForCommand.stub') : file.resource_path('/stubs/ActionForQuery.stub');

    let stubContent = file.readFile(stub);

    stubContent = stubContent.replaceAll('${action}', action);
    stubContent = stubContent.replaceAll('${grouping}', grouping);

    return stubContent;
}

const buildAdapterClass = (action, grouping, isCommand) => {
    const stub = isCommand ? file.resource_path('/stubs/CommandHttpAdapter.stub') : file.resource_path('/stubs/QueryHttpAdapter.stub');

    let stubContent = file.readFile(stub);

    stubContent = stubContent.replaceAll('${action}', action);
    stubContent = stubContent.replaceAll('${grouping}', grouping);

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

        classAttributes += `    private ${name}` + isNullable(type) ? '?:' : ':' + `${name}; \n`;

        constructorParameters += `        ${name}${isNullable(type) ? '?:' : ':'} ${type} ${isNullable(type) ? '= null' : ''} ${isLastElement(attribute, attributes) ? '' : ",\n"}`
        constructorAssignment += `        this.${name} = ${name} ${isLastElement(attribute, attributes) ? ';' : ':\n'}`

        getMethods += isFirstElement(attribute, attributes) ? '\n' : "\n\n";
        getMethods += `    public get${attribute.charAt(0).toUpperCase() + attribute.slice(1)}(): ${type} \n`
        getMethods += `    {\n`;
        getMethods += `        return this.${name};\n`;
        getMethods += `    }`
    }


    const stub = isCommand ? file.resource_path('/stubs/ActionForCommand.stub') : file.resource_path('/stubs/ActionForQuery.stub');

    let stubContent = file.readFile(stub);

    stubContent = stubContent.replaceAll('${action}', action);
    stubContent = stubContent.replaceAll('${grouping}', grouping);
    stubContent = stubContent.replaceAll('${class_attributes}', classAttributes);
    stubContent = stubContent.replaceAll('${constructor_parameters}', constructorParameters);
    stubContent = stubContent.replaceAll('${constructor_assignments}', constructorAssignment);
    stubContent = stubContent.replaceAll('${get_methods}', getMethods);

    return stubContent;
}

const buildHandlerClass = (action, grouping, isCommand) => {
    const stub = isCommand ? file.resource_path('/stubs/CommandHandler.stub') : file.resource_path('/stubs/QueryHandler.stub');

    let stubContent = file.readFile(stub);

    stubContent = stubContent.replaceAll('${action}', action);
    stubContent = stubContent.replaceAll('${grouping}', grouping);

    return stubContent;
}

const buildResultClass = (action, grouping) => {
    const stub = file.resource_path('/stubs/QueryResult.stub');

    let stubContent = file.readFile(stub);

    stubContent = stubContent.replaceAll('${action}', action);
    stubContent = stubContent.replaceAll('${grouping}', grouping);

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