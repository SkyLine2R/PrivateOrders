const initialState = {
  modalWindowVendorCodeOpen: false,
  vendorCode: "",
  itemName: "",
  unit: "0",
  quantity: "1",
  notes: "",
  vendorCodesArr: [],
  prevReq: {},
  status: null,
  error: null,
  snackbars: { open: false, severity: "info", message: null },
  lastVendorCodeId: null,
};

export default initialState;
