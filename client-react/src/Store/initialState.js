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
  request: {
    status: null,
    error: null,
    prevReq: {},
  },
  lastVendorCodeId: null,
};

export default initialState;
