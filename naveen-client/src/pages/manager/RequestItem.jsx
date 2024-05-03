import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateItemRequestMutation } from '../../redux/features/manager/requestItem.api';

const RequestItem = () => {
  const [createItemRequest] = useCreateItemRequestMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemsName: '',
      itemsDescription: '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Loading...');

    try {
      const itemsNameArray = data.itemsName.split(', ');
      const itemsInfo = {
        itemsName: itemsNameArray,
        itemsDescription: data.itemsDescription,
      };

      const result = await createItemRequest(itemsInfo);

      if (result?.data?.success) {
        toast.success('Item request added successfully!', {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
    reset();
  };
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Request Item
        </h2>
      </header>
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Items Name</span>

            <input
              {...register('itemsName', { required: true })}
              type="text"
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="eg: paper towel, sensor, spray"
            />
          </label>
          {errors.itemsName && (
            <p className="text-red-500 my-3">Items name is required</p>
          )}
          {/* itemDescription type */}
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Item Description
            </span>
            <input
              {...register('itemsDescription', { required: true })}
              type="text"
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            />
          </label>
          {errors.itemsDescription && (
            <p className="text-red-500 my-3">Item description is required</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Request Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestItem;
