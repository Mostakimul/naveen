import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

const ItemsList = ({ item }) => {
  const {
    requestId,
    itemsName,
    itemsDescription,
    requestStatus,
    remarks,
    itemsCost,
    invoiceImage,
    user,
    store,
    createdAt,
  } = item || {};

  return (
    <tr className="text-center">
      <td className="border border-slate-600">{itemsName.join(', ')}</td>
      <td className="border border-slate-600">{itemsDescription}</td>
      <td className="border border-slate-600">$ {itemsCost || '00.00'}</td>
      <td className="border border-slate-600">{invoiceImage || 'N/A'}</td>
      <td className="border border-slate-600">{remarks || 'N/A'}</td>
      <td className="border border-slate-600">
        <span
          className={`${
            requestStatus === 'PENDING'
              ? 'badge badge-info badge-sm'
              : requestStatus === 'APPROVED'
              ? 'badge badge-warning badge-sm'
              : requestStatus === 'REJECTED'
              ? 'badge badge-error badge-sm'
              : requestStatus === 'RECEIVED'
              ? 'badge badge-success badge-sm'
              : 'badge badge-accent badge-sm'
          }`}
        >
          {requestStatus}
        </span>
      </td>
      <td className="border border-slate-600">{store?.storeName}</td>
      <td className="border border-slate-600">{user?.userCode}</td>
      <td className="border border-slate-600">
        {moment(createdAt).format('L')}
      </td>
      <td className="border border-slate-600">
        <Link to={`/items/edit-request/${requestId}`}>
          <button className="btn btn-info btn-xs">Edit</button>
        </Link>
      </td>
    </tr>
  );
};

export default ItemsList;
