import {
    buildActionClass,
    buildActionFilePath, buildAdapterClass,
    buildAdapterFilePath, buildHandlerClass,
    buildHandlerFilePath, buildInputClass,
    buildInputFilePath, buildResultClass,
    buildResultFilePath, fileSystemPut, makeDirectory
} from "./codeGenerator";

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is a usecase name? ", function(useCaseName) {
    rl.question("Do you need a query (q) o a command (c)? Put 'q' or 'c': ", function(useCaseType) {
        rl.question('What attributes do you need? Format: name-type (Ex.: name-Object,userId-int,age-?string)', function (attributes) {
            rl.question('If you have a specific grouping, write it down (Ex.: /Grouping/Example)', function(grouping) {
                const isCommand = useCaseType === 'c';
                const actionFilePath = buildActionFilePath(useCaseName, grouping);
                const adapterFilePath = buildAdapterFilePath(useCaseName, grouping);
                const inputFilePath = buildInputFilePath(useCaseName, grouping, isCommand);
                const handlerFilePath = buildHandlerFilePath(useCaseName, grouping, isCommand);
                const resultFilePath = isCommand === false ? buildResultFilePath(useCaseName, grouping) : null;

                console.info('\n1. File paths was built!\n');

                const actionClass = buildActionClass(useCaseName, grouping, isCommand);
                const adapterClass = buildAdapterClass(useCaseName, grouping, isCommand);
                const inputClass = buildInputClass(useCaseName, grouping, attributes, isCommand);
                const handlerClass = buildHandlerClass(useCaseName, grouping, isCommand);
                const resultClass = isCommand === false ? buildResultClass(useCaseName, grouping) : null;

                console.info('2. Classes was built!\n');

                makeDirectory(actionFilePath);
                makeDirectory(adapterFilePath);
                makeDirectory(inputFilePath);
                makeDirectory(handlerFilePath);

                if (!isCommand) {
                    makeDirectory(resultFilePath);
                }

                console.info('3. Directories was checked!\n');

                fileSystemPut(actionFilePath, actionClass);
                console.info(" >>> File " + actionFilePath + " was created");
                fileSystemPut(adapterFilePath, adapterClass);
                console.info(" >>> File " + adapterFilePath + " was created");
                fileSystemPut(inputFilePath, inputClass);
                console.info(" >>> File " + inputFilePath + " was created");
                fileSystemPut(handlerFilePath, handlerClass);
                console.info(" >>> File " + handlerFilePath + " was created");

                if (!isCommand) {
                    fileSystemPut(resultFilePath, resultClass);
                    console.info(" >>> File " + resultFilePath + " was created");
                }

                console.info('4. Files was created!\n');
            })
        })
        rl.close();
    });
});

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});