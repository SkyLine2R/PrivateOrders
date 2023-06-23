import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import Warehouse from "@mui/icons-material/Warehouse";

import DialogSelect from "../base-elements/dialog-select";
import fetchEntries from "../Store/fetchEntries";
import { setCurrentCustomerId } from "../Store/Slices/slice-customers";

export default function DialogSelectCustomer() {
  const dispatch = useDispatch();

  React.useEffect(() => dispatch(fetchEntries("customers")), []);

  const { currentId, catalog } = useSelector(({ customers }) => customers);

  return (
    <DialogSelect
      titleSelect="ВЫБРАТЬ СКЛАД"
      icon={<Warehouse fontSize="small" sx={{ paddingRight: "10px" }} />}
      titleDialog="Выбрать склад заказчика"
      catalog={catalog}
      setCurrent={setCurrentCustomerId}
      currentId={currentId}
    />
  );
}