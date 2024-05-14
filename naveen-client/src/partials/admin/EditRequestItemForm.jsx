import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useUpdateRequestItemMutation } from '../../redux/features/admin/itemManagement.api';
import { modifyPayload } from '../../utils/modifyPayload';

const EditRequestItemForm = ({ item }) => {
  const {
    requestId,
    itemsName,
    itemsDescription,
    itemsCost,
    invoiceImage,
    remarks,
    requestStatus,
    store,
    user,
  } = item;
  const [updateRequestItem] = useUpdateRequestItemMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemsCost: itemsCost || '',
      invoiceImage: invoiceImage || null,
      remarks: remarks || '',
      requestStatus: requestStatus || '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Loading...');
    try {
      const updatedInfo = {
        ...data,
        itemsCost: Number(data.itemsCost),
        invoiceImage: data.invoiceImage[0],
      };
      const modifyData = modifyPayload(updatedInfo);

      for (var pair of modifyData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const result = await updateRequestItem({
        reqId: requestId,
        data: modifyData,
      });

      reset();
      if (result?.data) {
        toast.success('Item request updated successfully!', {
          id: toastId,
          duration: 2000,
        });
        navigate('/items/all-requests');
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-400">Items Name</span>
          <input
            value={itemsName.join(', ')}
            type="text"
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            disabled
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-400">
            Items Description
          </span>
          <input
            value={itemsDescription}
            type="text"
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            disabled
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-400">Store</span>
          <input
            value={store?.storeName}
            type="text"
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            disabled
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-400">User</span>
          <input
            value={user?.userCode}
            type="text"
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            disabled
          />
        </label>

        <label className="block mt-4 text-sm">
          <span className="text-gray-700 dark:text-gray-400">Status</span>
          <select
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
            {...register('requestStatus')}
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="IN_TRANSIT">IN TRANSIT</option>
            <option value="RECEIEVED">RECEIEVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </label>

        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-400">Items Cost</span>
          <input
            {...register('itemsCost')}
            type="text"
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          />
        </label>

        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-400">
            Invoice Image
          </span>
          <input
            {...register('invoiceImage')}
            type="file"
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-400">Remarks</span>
          <input
            {...register('remarks')}
            type="text"
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          />
        </label>

        <button
          type="submit"
          className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Update Request
        </button>
      </form>
    </>
  );
};

export default EditRequestItemForm;
