import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import EditItemsPage from "../edit-items-page/edit-items-page";
import EditVendorCodeDialog from "../edit-vendor-code-dialog/edit-vendor-code-dialog";

import vendorCodesMenuActions from "../components/menu-actions-vendor-codes";
import dbSchema from "../../../components/vendor-codes-db_schema";

import { setModalWindowVendorCodeOpen } from "../Store/Slices/slice-vendor-codes";

import fetchEntries from "../Store/fetchEntries";

export default function EditVendorCodePage() {
  const { vendorCodesArr, modalWindowVendorCodeOpen } = useSelector(
    (state) => state.vendorCodes,
    shallowEqual
  );

  const dispatch = useDispatch();
  React.useEffect(() => dispatch(fetchEntries("vendorCodes")), [dispatch]);

  return (
    <EditItemsPage
      headerText="Редактирование артикулов"
      HeaderIcon={EditIcon}
      modalWindowOpen={modalWindowVendorCodeOpen}
      dataArr={vendorCodesArr}
      allMenuActions={vendorCodesMenuActions}
      EditDialog={EditVendorCodeDialog}
      dbSchema={dbSchema}
      setModalWindowOpen={setModalWindowVendorCodeOpen}
    />
  );

  /* 



  return (
    <Container
      maxWidth="md"
      sx={{ margin: "20px auto" }}
      onClick={handleMenuInContainer}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "15px",
        }}
      >
        <GroupIcon fontSize="large" sx={{ color: "primary.dark" }} />
        <Typography variant="h5" sx={{ paddingLeft: "15px" }}>
          Пользователи базы данных
        </Typography>
      </Box>
      {modalWindowUsersEditOpen ? (
        <EditVendorCodeDialog editType={editType} itemId={menuParams.id} />
      ) : (
        <SpeedDialMenu
          menuParams={menuParams}
          onClick={handleMenuSelect}
          onMouseLeave={handleOffMenu}
        />
      )}
      <DataGrid
        dbSchema={dbSchema}
        dataArr={usersArr}
        onCellClick={handleMenuInDataGrid}
      />
    </Container>
  ); */
}
