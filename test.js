function sostavChisla(massivChisel, chislo) {
  // код писать только внутри данной функции
  const resultArr = [];
  const searchCombination = (foundCombination, summ, startI) => {
    if (summ > chislo) {
      return;
    }
    if (summ === chislo) {
      resultArr.push([...foundCombination]);
      return;
    }
    for (let i = startI; i < massivChisel.length; i++) {
      foundCombination.push(massivChisel[i]);
      searchCombination(foundCombination, summ + massivChisel[i], i + 1);
      foundCombination.pop();
    }
  };
  searchCombination([], 0, 0);
  return resultArr;
}

console.log(sostavChisla([7, 8, 3, 4, 5, 6, 1, 2], 1));

/* 
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
} */
