const initialState = {
  modalWindowVendorCodeOpen: false,
  inputFields: {
    vendorCode: "",
    itemName: "",
    unit: "0",
    quantity: "1",
    notes: "",
  },
  vendorCodesArr: [],
  snackbars: {
    snackbars: { open: false, severity: "info", message: null },
  },
  request: {
    status: null,
    error: null,
    prevReq: {},
  },
  lastVendorCodeId: null,
};

export default initialState;
