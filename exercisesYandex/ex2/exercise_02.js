const fs = require("fs");
const inputFileName = "./input.txt";

function beautifulString(numberOfSubstitutions, textString) {
  console.log(numberOfSubstitutions);
  console.log(textString);

  const uniqueLetters = new Set(...textString.split("")).size;
  const textStringLenght = textString.lenght;

  if (
    textStringLenght <= numberOfSubstitutions ||
    textStringLenght == numberOfSubstitutions + 1
  )
    return textStringLenght;

  if (uniqueLetters === 1) return textStringLenght;

  if (uniqueLetters === textStringLenght) return numberOfSubstitutions + 1;

  let searchSymbolPos = 1;
  let restChangeLatters = numberOfSubstitutions;
  let krasotaSearch = 1;

  while (
    searchSymbolPos < textStringLenght &&
    (restChangeLatters > 0 || beatifulLine)
  ) {
    searchSymbol = textString[searchSymbolPos - 1];

    if (textString[searchSymbolPos] == searchSymbol) {
      krasotaSearch++;
      beatifulLine = true;
    } else restChangeLatters--;
  }
}
startSearchPosition = 1;

console.log();

/* function choiceOfOptions(
   
  string,
  searchPosition,
  numberOfCoincidences,
  numberOfSubstitutions,
  leftToReplace
) 
 */

fs.readFile(inputFileName, (errRead, data) => {
  if (errRead) {
    throw errRead;
  }
  const dataToSave = beautifulString(...data.toString().split("\n"));
  process.stdout.write(dataToSave);
});

// let inputString = "";

/* const read = () =>
  process.stdin.on("readable", (chunk) => {
    //console.log(chunk);
    return chunk;
  }); */

//console.log(read());
// let chunk = process.stdin.read();

// inputString += inputSt;

/*   process.stdin.on("end", () => {
    console.log("There will be no more data.");
  }); */

// process.stdout.write("Получено" + inputString);
// }); */
/* process.stdin.on("readable", (chunk) => {
  console.log(chunk);
  process.stdin.on("read", (chunk1) => {
    console.log(chunk1);
  });
}); */
