const generator = require("./codeGenerator");

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

                const actionFilePath = generator.buildActionFilePath(useCaseName, grouping);
                const adapterFilePath = generator.buildAdapterFilePath(useCaseName, grouping);
                const inputFilePath = generator.buildInputFilePath(useCaseName, grouping, isCommand);
                const handlerFilePath = generator.buildHandlerFilePath(useCaseName, grouping, isCommand);
                const resultFilePath = isCommand === false ? generator.buildResultFilePath(useCaseName, grouping) : null;

                console.info('\n1. File paths was built!\n');

                const actionClass = generator.buildActionClass(useCaseName, grouping, isCommand);
                const adapterClass = generator.buildAdapterClass(useCaseName, grouping, isCommand);
                const inputClass = generator.buildInputClass(useCaseName, grouping, attributes, isCommand);
                const handlerClass = generator.buildHandlerClass(useCaseName, grouping, isCommand);
                const resultClass = isCommand === false ? generator.buildResultClass(useCaseName, grouping) : null;

                console.info('2. Classes was built!\n');

                generator.makeDirectory(actionFilePath);
                generator.makeDirectory(adapterFilePath);
                generator.makeDirectory(inputFilePath);
                generator.makeDirectory(handlerFilePath);

                if (!isCommand) {
                    generator.makeDirectory(resultFilePath);
                }

                console.info('3. Directories was checked!\n');

                generator.fileSystemPut(actionFilePath, actionClass);
                console.info(" >>> File " + actionFilePath + " was created");
                generator.fileSystemPut(adapterFilePath, adapterClass);
                console.info(" >>> File " + adapterFilePath + " was created");
                generator.fileSystemPut(inputFilePath, inputClass);
                console.info(" >>> File " + inputFilePath + " was created");
                generator.fileSystemPut(handlerFilePath, handlerClass);
                console.info(" >>> File " + handlerFilePath + " was created");

                if (!isCommand) {
                    generator.fileSystemPut(resultFilePath, resultClass);
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