import React from 'react';
import StoreList from '../../../partials/admin/StoreList';
import { useGetAllStoresQuery } from '../../../redux/features/admin/storeManagement.api';

const AllStore = () => {
  const {
    data: stores,
    isError,
    error,
    isLoading,
  } = useGetAllStoresQuery() || {};

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
  } else if (!isLoading && !isError && stores?.data?.length === 0) {
    content = (
      <tr>
        <td className="m-2 text-center">No stores found!</td>
      </tr>
    );
  } else if (!isLoading && !isError && stores?.data?.length > 0) {
    content = stores?.data.map((store) => (
      <StoreList key={store.storeId} store={store} />
    ));
  }
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All Stores
        </h2>
      </header>

      <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th className="border border-slate-600">Store Name</th>
                <th className="border border-slate-600">Store Type</th>
                <th className="border border-slate-600">Manager</th>
                <th className="border border-slate-600">Location</th>
                <th className="border border-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStore;
