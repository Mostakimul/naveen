import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAddSaleMutation } from '../../redux/features/manager/managerSale.api';

const AddSale = () => {
  const [addSale] = useAddSaleMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
      date: '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Loading...');

    try {
      const saleInfo = {
        amount: Number(data.amount),
        date: data.date,
      };

      const result = await addSale(saleInfo);

      if (result?.data?.success) {
        toast.success('Sale added successfully!', {
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
          Add Sale
        </h2>
      </header>
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Amount</span>
            <input
              {...register('amount', { required: true })}
              type="text"
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            />
          </label>
          {errors.amount && (
            <p className="text-red-500 my-3">Amount is required</p>
          )}
          {/* date type */}
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Date</span>
            <input
              {...register('date', { required: true })}
              type="date"
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            />
          </label>
          {errors.date && <p className="text-red-500 my-3">Date is required</p>}

          {/* Submit */}
          <button
            type="submit"
            className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Add Sale
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSale;
