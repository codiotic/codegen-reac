exports.tableUiTemplate = `
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ATMPagination from "src/components/UI/atoms/ATMPagination/ATMPagination";
import ATMTable from "src/components/UI/atoms/ATMTable/ATMTable";
import ATMTableHeader from "src/components/UI/atoms/ATMTableHeader/ATMTableHeader";
import {
  setRowsPerPage,
  setPage,
  setSearchValue,
} from "src/redux/slices/__SLICE_NAME__Slice";
import { AppDispatch, RootState } from "src/redux/store";
import { useNavigate } from "react-router-dom";
import { __MODULE_NAME__ListResponse } from "src/models/__MODULE_NAME__.model";

type Props = {
  columns: any[];
  rows: any[];
  isTableLoading: boolean;
};

const __MODULE_NAME__Listing = ({
  columns,
  rows,
  isTableLoading,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, rowsPerPage, searchValue, totalItems} = useSelector((state: RootState) => state.__SLICE_NAME__);
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">

      <div className="border flex flex-col grow overflow-auto rounded bg-white ">
        {/*Table Header */}
        <ATMTableHeader
          page={page}
          rowCount={totalItems}
          rowsPerPage={rowsPerPage}
          rows={rows}
          onRowsPerPageChange={(newValue:number) => dispatch(setRowsPerPage(newValue))}
          searchValue={searchValue}
          onSearchChange={(newValue:string) => {
            dispatch(setSearchValue(newValue));
          }}
        />

        {/* Table */}
        <div
          id="scroll-top"
          className="border flex flex-col grow rounded bg-white overflow-auto scroll-smooth"
        >
          <ATMTable
            columns={columns}
            rows={rows}
            isLoading={isTableLoading}
            noDataMessage="No  __MODULE_NAME__ Found"
          />
        </div>

        {/* Pagination */}
        <div className=" flex items-center justify-end border-t border-slate-300">
          <ATMPagination
            page={page}
            rowCount={totalItems}
            rows={rows}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage:number) => dispatch(setPage(newPage))}
          />
        </div>
      </div>
    </div>
  );
};

export default  __MODULE_NAME__Listing;

`;
