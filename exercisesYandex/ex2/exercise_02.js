/* eslint-disable no-unused-expressions */
/* eslint-disable spaced-comment */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
const fs = require("fs");

const inputFileName = "./input.txt";

function searchBeautifulString(quantityOfchange, textString) {
  const quantityUnqLtrs = new Set(textString.split("")).size; // уникальные буквы
  const textStrLnth = textString.length; // длина строки

  if (
    textStrLnth <= quantityOfchange ||
    textStrLnth == quantityOfchange + 1 ||
    quantityUnqLtrs === 1
  )
    return textStrLnth;

  const beatiful1 = search(textString);
  const beatiful2 = search(textString.split("").reverse().join(""));
  console.log(beatiful2);
  console.log(beatiful1);

  return beatiful1 > beatiful2 ? beatiful1 : beatiful2;

  function search(textString) {
    console.log("Количество изменений:" + quantityOfchange);
    console.log("Строка: " + textString);

    let startSearchPos = 0;
    let lengthOfBeatifulStr = 1;

    while (startSearchPos + 1 < textStrLnth - quantityOfchange) {
      let restQuantityOfchange = quantityOfchange;
      let currentLnthOfBeatifulStr = 1;
      let lastChance = true;
      const searchSymbol = textString[startSearchPos];

      let currentSearchSymbolPos = startSearchPos + 1;

      console.log("   ");
      console.log("Старт поиска с нового символа");
      console.log("startSearchPos" + startSearchPos);

      console.log("searchSymbol " + searchSymbol);

      while (currentSearchSymbolPos + 1 < textStrLnth && lastChance) {
        console.log("currentLnthOfBeatifulStr " + currentLnthOfBeatifulStr);
        console.log("currentSearchSymbolPos: " + currentSearchSymbolPos);
        console.log("restQuantityOfchange: " + restQuantityOfchange);

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
        // подбор позиции следующего стартового символа, чтобы это был отличный от уже пройденного
        searchSymbol == textString[startSearchPos] &&
        startSearchPos < textStrLnth - quantityOfchange
      ) {
        startSearchPos++;
      }
      console.log("startSearchPos " + startSearchPos);
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
