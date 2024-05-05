import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import React from 'react';
import SalesList from '../../../partials/admin/SalesList';
import { useGetAllSalesQuery } from '../../../redux/features/admin/saleManagement.api';

const AllSale = () => {
  const {
    data: sales,
    isError,
    error,
    isLoading,
  } = useGetAllSalesQuery() || {};

  let content = null;

  if (isLoading) {
    content = (
      <tr>
        <td className="m-2 text-center">Loading...</td>
      </tr>
    );
  } else if (!isLoading && isError) {
    content = (
      <tr>
        <td className="m-2 text-center">
          <Error message={error?.data} />
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && sales?.data?.length === 0) {
    content = (
      <tr>
        <td className="m-2 text-center">No sales found!</td>
      </tr>
    );
  } else if (!isLoading && !isError && sales?.data?.length > 0) {
    content = sales?.data?.map((sale) => (
      <SalesList key={sale.salesId} sale={sale} />
    ));
  }

  const exportPdf = async () => {
    const doc = new jsPDF();
    doc.autoTable({
      html: '#sales-table',
    });
    doc.save('sales.pdf');
  };
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="flex justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All Sales
        </h2>

        <button onClick={exportPdf} class="btn btn-sm btn-primary">
          Export
        </button>
      </header>

      <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table id="sales-table" className="table">
            <thead>
              <tr className="text-center">
                <th className="border border-slate-600">Date</th>
                <th className="border border-slate-600">Store Name</th>
                <th className="border border-slate-600">Store Location</th>
                <th className="border border-slate-600">Amount</th>
                <th className="border border-slate-600">Manager</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSale;
