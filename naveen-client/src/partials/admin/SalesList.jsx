import moment from 'moment';
import React from 'react';

const SalesList = ({ sale }) => {
  const { date, amount, store, user } = sale || {};

  return (
    <tr className="text-center">
      <td className="border border-slate-600">{moment(date).format('L')}</td>
      <td className="border border-slate-600">{store?.storeName}</td>
      <td className="border border-slate-600">{store?.storeLocation}</td>
      <td className="border border-slate-600">$ {amount}</td>
      <td className="border border-slate-600">{user?.userCode}</td>
    </tr>
  );
};

export default SalesList;
