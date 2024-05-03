import React from 'react';
import Error from '../../components/Error';
import ItemsList from '../../partials/admin/ItemsList';
import { useGetMyRequestItemQuery } from '../../redux/features/manager/requestItem.api';

const RequestedItems = () => {
  const {
    data: items,
    isError,
    error,
    isLoading,
  } = useGetMyRequestItemQuery(undefined, {
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
  } else if (!isLoading && !isError && items?.data?.length === 0) {
    content = (
      <tr>
        <td className="m-2 text-center">No items found!</td>
      </tr>
    );
  } else if (!isLoading && !isError && items?.data?.length > 0) {
    content = items?.data.map((item) => (
      <ItemsList key={item?.requestId} item={item} />
    ));
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          My Requested Items
        </h2>
      </header>

      <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th className="border border-slate-600">Items</th>
                <th className="border border-slate-600">Items Description</th>
                <th className="border border-slate-600">Status</th>
                <th className="border border-slate-600">Store Name</th>
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

export default RequestedItems;
