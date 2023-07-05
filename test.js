/* eslint-disable no-plusplus */
/* function sostavChisla(massivChisel, chislo) {
  const resultArr = [];
  const arrLength = massivChisel.length;

  for (let i = 0; i < arrLength - 1; i++) {
    let summ = massivChisel[i];
    let startJ = i + 1;
    let j = startJ;
    const numberArr = [massivChisel[i]];
    console.log(i);

    while (j < arrLength) {
      console.log("j " + j);
      console.log("summ " + summ);
      console.log(numberArr);

      if (summ === chislo) {
        resultArr.push(numberArr);
        break;
      }

      if (summ > chislo) {
        startJ++;
        j = startJ;
      } else {
        summ += massivChisel[j];
        numberArr.push(massivChisel[j]);
        j++;
      }
    }
  }
  // код писать только внутри данной функции
  return resultArr;
} */

function sostavChisla1(massivChisel, chislo) {
  const resultArr = [];
  const searchCombination = (foundCombination, summ, startI) => {
    if (summ > chislo) return;
    if (summ === chislo) {
      resultArr.push([...foundCombination]);
      return;
    }
    for (let i = startI; i < massivChisel.length; i++) {}
  };
}

function sostavChisla(massivChisel, chislo) {
  const combinations = [];
  // Рекурсивная функция для поиска комбинаций
  function findCombinations(currentCombination, remainingSum, startIdx) {
    if (remainingSum === 0) {
      combinations.push(currentCombination.slice()); // Добавляем найденную комбинацию
      return;
    }

    if (remainingSum < 0) {
      return;
    }

    for (let i = startIdx; i < massivChisel.length; i++) {
      const currentNumber = massivChisel[i];

      if (currentCombination.includes(currentNumber)) continue; // Пропускаем повторяющиеся числа

      currentCombination.push(currentNumber);
      findCombinations(currentCombination, remainingSum - currentNumber, i + 1);
      currentCombination.pop();
    }
  }

  findCombinations([], chislo, 0);
  return combinations;
}

console.log(sostavChisla([8, 2, 3, 4, 6, 7, 1], 5));
