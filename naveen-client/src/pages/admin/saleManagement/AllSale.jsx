import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import React, { useState } from 'react';
import Error from '../../../components/Error';
import SalesList from '../../../partials/admin/SalesList';
import { useGetAllSalesQuery } from '../../../redux/features/admin/saleManagement.api';

const AllSale = () => {
  const [saleFilter, setSaleFilter] = useState('monthly');

  const {
    data: sales,
    isError,
    error,
    isLoading,
  } = useGetAllSalesQuery({ timeFrame: saleFilter });

  console.log(sales);

  const handleChange = (e) => {
    setSaleFilter(e.target.value);
  };

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
          <Error message="Error loading sales!" />
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

        <div className="flex justify-between gap-5 items-center">
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Filte Sales
            </span>
            <select
              onChange={handleChange}
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
              name="timeFrame"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
          <button onClick={exportPdf} className="btn btn-sm btn-primary">
            Export
          </button>
        </div>
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
