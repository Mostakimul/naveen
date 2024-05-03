import React from 'react';

const StoreList = ({ store }) => {
  const { storeName, storeType, storeLocation, user, storeId } = store || {};

  return (
    <tr className="text-center">
      <td className="border border-slate-600">{storeName}</td>
      <td className="border border-slate-600">{storeType}</td>
      <td className="border border-slate-600">{user.userCode}</td>
      <td className="border border-slate-600">{storeLocation}</td>
      <td className="border border-slate-600 space-x-2">
        <button className="btn btn-sm  btn-error">Delete</button>
      </td>
    </tr>
  );
};

export default StoreList;
