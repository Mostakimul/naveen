import React from 'react';
import { useParams } from 'react-router-dom';
import Error from '../../../components/Error';
import EditRequestItemForm from '../../../partials/admin/EditRequestItemForm';
import { useGetSingleRequestItemQuery } from '../../../redux/features/admin/itemManagement.api';

const EditItemRequest = () => {
  const { reqId } = useParams();
  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useGetSingleRequestItemQuery(reqId);

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
  } else if (!isLoading && !isError && !item?.data) {
    content = (
      <tr>
        <td className="m-2 text-center">No users found!</td>
      </tr>
    );
  } else if (!isLoading && !isError && item?.data) {
    content = <EditRequestItemForm item={item?.data} />;
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Edit Item
        </h2>
      </header>
      <div className="p-5">{content}</div>
    </div>
  );
};

export default EditItemRequest;
