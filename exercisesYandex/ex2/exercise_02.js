const fs = require("fs");
const inputFileName = "./input.txt";

function searchBeautifulString(quantityOfchange, textString) {
  quantityOfchange = +quantityOfchange;

  console.log("Количество изменений:" + quantityOfchange);
  console.log("Строка: " + textString);

  const quantityUnqLtrs = new Set(textString.split("")).size; //уникальные буквы
  const textStrLnth = textString.length; //длина строки

  console.log(quantityUnqLtrs + quantityOfchange >= textStrLnth);

  if (
    textStrLnth <= quantityOfchange ||
    textStrLnth == quantityOfchange + 1 ||
    quantityUnqLtrs + quantityOfchange >= textStrLnth ||
    quantityUnqLtrs === 1
  )
    return textStrLnth;

  let startSearchPos = 1;
  let currentSearchSymbolPos = 1;
  let restQuantityOfchange = quantityOfchange;
  let lengthOfBeatifulStr = 1;
  let currentLengthOfBeatifulStr = 1;
  let searchSymbol = textString[0];
  let beatifulLine = false;

  /*  while (textStrLnth - startSearchPos > lengthOfBeatifulStr) { */
  while (startSearchPos < textStrLnth) {
    restQuantityOfchange = quantityOfchange;
    while (
      currentSearchSymbolPos < textStrLnth && ///возможно добавить единицу к текущей, для увел. скорости
      (restQuantityOfchange > 0 || beatifulLine)
    ) {
      console.log("currentSearchSymbolPos: " + currentSearchSymbolPos);
      console.log("restQuantityOfchange: " + restQuantityOfchange);
      if (textString[currentSearchSymbolPos] == searchSymbol) {
        currentLengthOfBeatifulStr++;
        beatifulLine = true;
      } else {
        restQuantityOfchange--;
        beatifulLine = false;
      }
      currentSearchSymbolPos++;
    }
    if (lengthOfBeatifulStr < currentLengthOfBeatifulStr)
      //текущая лучшая строка
      lengthOfBeatifulStr = currentLengthOfBeatifulStr;
    while (
      //подбор позиции следующего символа, чтобы это был отличный от уже пройденного
      searchSymbol == textString[startSearchPos - 1] &&
      startSearchPos + 1 < textStrLnth
    ) {
      startSearchPos++;
    }
    searchSymbol = textString[currentSearchSymbolPos - 1];
    currentSearchSymbolPos = startSearchPos;
    beatifulLine = false;
  }
  return lengthOfBeatifulStr + "";
}

fs.readFile(inputFileName, (errRead, data) => {
  if (errRead) {
    throw errRead;
  }
  //console.log(searchBeautifulString(...data.toString().split("\n")));
  const dataToSave = searchBeautifulString(...data.toString().split("\n"));
  process.stdout.write(dataToSave + "");
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
