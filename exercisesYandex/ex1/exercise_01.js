const fs = require("fs");
const inputFileName = "./input.txt";

fs.readFile(inputFileName, (errRead, data) => {
  if (errRead) {
    throw errRead;
  }
  const dataToSave = barChart(data.toString());
  process.stdout.write(dataToSave);
});

function barChart(textString) {
  const obj = textString.match(/\S/g).reduce((resultObj, item) => {
    const testSymbol = item.codePointAt(0);

    return testSymbol in resultObj
      ? { ...resultObj, [testSymbol]: resultObj[testSymbol] + 1 }
      : { ...resultObj, [testSymbol]: 1 };
  }, {});

  const arrNum = [];
  let strLetter = "";
  let result = "";

  for (key in obj) {
    strLetter += String.fromCodePoint(key);
    arrNum.push(obj[key]);
  }
  for (let i = 0; i < Math.max(...arrNum); i++) {
    let lineString = "";

    for (let j = 0; j < arrNum.length; j++)
      lineString += arrNum[j] - i > 0 ? "#" : " ";

    result = `${lineString}\n${result}`;
  }
  return `${result + strLetter}`;
}
