import React from 'react';

const ItemsList = ({ item }) => {
  const { itemsName, itemsDescription, requestStatus, user, store } =
    item || {};

  return (
    <tr className="text-center">
      <td className="border border-slate-600">{itemsName.join(', ')}</td>
      <td className="border border-slate-600">{itemsDescription}</td>
      <td className="border border-slate-600">{requestStatus}</td>
      <td className="border border-slate-600">{store?.storeName}</td>
      <td className="border border-slate-600">{user?.userCode}</td>
    </tr>
  );
};

export default ItemsList;
