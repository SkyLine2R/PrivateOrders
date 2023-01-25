export function testDataFromForm(refObj, jsonData) {
  const testObj = JSON.parse(jsonData);
  for (let key in refObj) {
    console.log(refObj[key]);
    console.log(testObj[key]);
  }
}

export const testFormForInputItem = {
  vendorCode: {
    required: true,
    maxlength: 20,
    isNumber: false,
    description: "артикул изделия",
    regularExp: '-+*а-яё.,"/dws',
  },
  itemName: {
    required: true,
    maxlength: 255,
    isNumber: false,
    description: "наименование изделия",
    regularExp: '-+*а-яё.,"/dws',
  },
  unit: {
    required: true,
    maxlength: 15,
    isNumber: false,
    description: "единицы измерения",
    regularExp: "а-яё.,-/dws",
  },
  length: {
    required: true,
    maxlength: 5,
    isNumber: true,
    min: 0.1,
    max: 5000,
    description: "количество единиц в хлысте или упаковке",
    regularExp: ".,/d",
  },
  notes: {
    required: false,
    maxlength: 300,
    isNumber: false,
    description: "примечания",
  },
};
