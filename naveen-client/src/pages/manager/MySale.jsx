import React from 'react';
import Error from '../../components/Error';
import SalesList from '../../partials/admin/SalesList';
import { useGetMySalesQuery } from '../../redux/features/manager/managerSale.api';

const MySale = () => {
  const {
    data: sales,
    isError,
    error,
    isLoading,
  } = useGetMySalesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  }) || {};

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
    content = sales?.data.map((sale) => (
      <SalesList key={sale.salesId} sale={sale} />
    ));
  }
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          My Sales
        </h2>
      </header>

      <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="table">
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

export default MySale;
