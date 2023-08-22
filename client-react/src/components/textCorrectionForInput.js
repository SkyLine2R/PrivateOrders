const textСorrectionInField = (refObj, fieldValue) => {
  if (!refObj) return fieldValue;
  const str = fieldValue.match(new RegExp(refObj.regularExp, "gi")) || [""];
  return (refObj.containsNumber ? str[0].replace(",", ".") : str[0]).substring(
    0,
    refObj.maxlength
  );
};

export default textСorrectionInField;
