import React from 'react';
import { toast } from 'sonner';
import { useDeleteStoreMutation } from '../../redux/features/admin/storeManagement.api';

const StoreList = ({ store }) => {
  const { storeName, storeType, storeLocation, user, storeId } = store || {};
  const [deleteStore, { isSuccess, error }] = useDeleteStoreMutation();

  const handleDelete = (storeId) => {
    deleteStore(storeId);
  };

  if (isSuccess) {
    toast.success('Store deleted successfully!');
  }

  if (error) {
    toast.error(error.data?.message);
  }

  return (
    <tr className="text-center">
      <td className="border border-slate-600">{storeName}</td>
      <td className="border border-slate-600">{storeType}</td>
      <td className="border border-slate-600">{user.userCode}</td>
      <td className="border border-slate-600">{storeLocation}</td>
      <td className="border border-slate-600 space-x-2">
        <button
          onClick={() => handleDelete(storeId)}
          className="btn btn-sm  btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StoreList;
