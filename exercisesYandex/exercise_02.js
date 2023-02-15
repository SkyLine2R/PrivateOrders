const fs = require("fs");

const inputFileName = "./input.txt";

function searchBeautifulString(quantityOfchange, textString) {
  const quantityUnqLtrs = new Set(textString.split("")).size;
  const textStrLnth = textString.length;

  if (
    textStrLnth <= quantityOfchange ||
    textStrLnth == quantityOfchange + 1 ||
    quantityUnqLtrs === 1
  )
    return textStrLnth;

  const beatiful1 = search(textString);
  const beatiful2 = search(textString.split("").reverse().join(""));

  return beatiful1 > beatiful2 ? beatiful1 : beatiful2;

  function search(textString) {
    let startSearchPos = 0;
    let lengthOfBeatifulStr = 1;

    while (startSearchPos < textStrLnth - quantityOfchange) {
      let restQuantityOfchange = quantityOfchange;
      let currentLnthOfBeatifulStr = 1;
      let lastChance = true;
      const searchSymbol = textString[startSearchPos];

      let currentSearchSymbolPos = startSearchPos + 1;

      while (currentSearchSymbolPos < textStrLnth && lastChance) {
        if (textString[currentSearchSymbolPos] == searchSymbol) {
          currentLnthOfBeatifulStr++;
        } else if (restQuantityOfchange) {
          restQuantityOfchange--;
          currentLnthOfBeatifulStr++;
        } else lastChance = false;

        currentSearchSymbolPos++;
      }
      if (lengthOfBeatifulStr < currentLnthOfBeatifulStr)
        lengthOfBeatifulStr = currentLnthOfBeatifulStr; // текущая лучшая строка

      startSearchPos++;

      while (
        searchSymbol == textString[startSearchPos] &&
        startSearchPos < textStrLnth - quantityOfchange
      ) {
        startSearchPos++;
      }
    }
    return lengthOfBeatifulStr;
  }
}

fs.readFile(inputFileName, (errRead, data) => {
  if (errRead) {
    throw errRead;
  }
  const quantityChange = +data.toString().split("\n")[0];
  const searchString = data.toString().split("\n")[1];

  const dataToSave = searchBeautifulString(quantityChange, searchString) + "";
  process.stdout.write(dataToSave);
});
