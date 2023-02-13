const fs = require("fs");

const inputFileName = "input.txt";
const outuptFileName = "output.txt";

fs.readFile(inputFileName, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const obj = data
    .toString()
    .match(/\S/g)
    .reduce((obj, item) => {

      let testSymbol = item.codePointAt(0);

      return testSymbol in obj
        ? { ...obj, [testSymbol]: obj[testSymbol] + 1 }
        : { ...obj, [testSymbol]: 1 };
    }, {});

  let strKeys = "";
  let arrNum = [];
  let result = "";
  
  for (key in obj) {
    strKeys += String.fromCodePoint(key);
    arrNum.push(obj[key]);
  }

  for (let i = 0; i < Math.max(...arrNum); i++) {
    let lineString = "";

    for (let j = 0; j < arrNum.length; j++) {
      lineString += arrNum[j] - i ? "#" : " ";
    }
    result = lineString + "\n" + "!" + result;
  }
  result += strKeys;

  console.log(result);
});

function barChart(text) {
  console.log(text.match(/\S/g));
  //text.text.str.codePointAt(pos);
}
