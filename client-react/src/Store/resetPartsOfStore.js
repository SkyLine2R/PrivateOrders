// модуль для обнуления или обновления независимых частей Store
// если происходят глобальные изменения состояния

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetInStockDocuments } from "./Slices/slice-documents-instock";

export default function ResetStoreParts() {
  const dispatch = useDispatch();

  /*   const catalog = useSelector((store) => store[page].catalog);
  const modalWindowIsOpen = useSelector(
    (store) => store[page].modalWindowIsOpen
  ); */
  /*   const alertModalWindowIsOpen = useSelector(
    (store) => store.alert.modalWindowIsOpen
  );
  const alertModalWindowIsOpen = useSelector(
    (store) => store.alert.modalWindowIsOpen
  ); */

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
