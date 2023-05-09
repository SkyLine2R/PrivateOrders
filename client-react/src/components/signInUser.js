export default async function signInUser() {
  const fetchObj = {
    type: "login",
    data: {
      table: "items",
      column: `${vendorCode ? "vendorCode" : "itemName"}`,
      string: vendorCode || itemName || "",
    },
  };
}
