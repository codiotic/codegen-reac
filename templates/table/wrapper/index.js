exports.tableWrapperTemplate = `
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import ATMMenu from "src/components/UI/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "src/components/UI/atoms/ATMTable/ATMTable";
import { __MODULE_NAME__Response } from "src/models/__MODULE_NAME__.model";
import {
  setIsTableLoading,
  setItems,
  setTotalItems,
} from "src/redux/slices/__SLICE_NAME__Slice";
import __MODULE_NAME__Listing from "./__MODULE_NAME__Listing";

const rowData = [
  {
    name: "Himanshu Jain",
    age: 24,
    dob: "12/01/1999",
    mobile: "8839072143",
  },
  {
    name: "Himanshu Jain",
    age: 24,
    dob: "12/01/1999",
    mobile: "8839072143",
  },
  {
    name: "Himanshu Jain",
    age: 24,
    dob: "12/01/1999",
    mobile: "8839072143",
  },
  {
    name: "Himanshu Jain",
    age: 24,
    dob: "12/01/1999",
    mobile: "8839072143",
  },
  {
    name: "Himanshu Jain",
    age: 24,
    dob: "12/01/1999",
    mobile: "8839072143",
  },
];

const __MODULE_NAME__ListingWrapper = () => {
  // States
  const { page, rowsPerPage, items, isTableLoading, searchValue } = useSelector((state: RootState) => state.__SLICE_NAME__);

  const dispatch = useDispatch<AppDispatch>();

  // Table Columns
  const columns: columnTypes[] = [
    {
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "age",
      headerName: "Age",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "dob",
      headerName: "DOB",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: "flex-[1_1_0%]",
    },
  ];

  // Setting Items
  useEffect(() => {
    dispatch(setIsTableLoading(false));
    dispatch(setItems(rowData));
    dispatch(setTotalItems(5));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SideNavLayout>
        <div className="h-full">
          <__MODULE_NAME__Listing
            columns={columns}
            rows={items}
            isTableLoading={isTableLoading}
          />
        </div>
      </SideNavLayout>

    </>
  );
};

export default __MODULE_NAME__ListingWrapper;

`;
