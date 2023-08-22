// модуль для обнуления или обновления независимых частей Store
// если происходят глобальные изменения состояния

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetInStockDocuments } from "./Slices/slice-documents-instock";
import fetchEntries from "./fetchEntries";

export default function ResetStoreParts() {
  const dispatch = useDispatch();

  React.useEffect(
    () => dispatch(fetchEntries({ api: "customers" })),
    [dispatch]
  );

  React.useEffect(() => {
    dispatch(fetchEntries({ api: "units" }));
  }, [dispatch]);

  const currentCustomerId = useSelector((store) => store.customers.currentId);

  // При смене склада - обнулить список документов по приходу
  React.useEffect(
    () => dispatch(resetInStockDocuments()),
    [currentCustomerId, dispatch]
  );
  /* 
  React.useEffect(() => {
    if (!alertModalWindowIsOpen) {
      dispatch(fetchEntries({ api: "customers" }));
    }
  }, [dispatch, alertModalWindowIsOpen]); */

  return null;
}
