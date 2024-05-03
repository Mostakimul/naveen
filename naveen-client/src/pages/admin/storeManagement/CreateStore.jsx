import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateStoreMutation } from '../../../redux/features/admin/storeManagement.api';
import { useGetAllUsersQuery } from '../../../redux/features/admin/userManagement.api';

const CreateStore = () => {
  const [createStore] = useCreateStoreMutation();
  const { data: users } = useGetAllUsersQuery();

  console.log(users);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      storeName: '',
      storeLocation: '',
      storeType: '',
      manager: '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Loading...');

    try {
      const storeInfo = {
        storeName: data.storeName,
        storeLocation: data.storeLocation,
        storeType: data.storeType,
        manager: data.manager,
      };

      const result = await createStore(storeInfo);

      if (result?.data?.success) {
        toast.success('Store created successfully!', {
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
          Create Store
        </h2>
      </header>
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Store Name</span>
            <input
              {...register('storeName', { required: true })}
              type="text"
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              // placeholder="PAULI"
            />
          </label>
          {errors.storeName && (
            <p className="text-red-500 my-3">Store name is required</p>
          )}
          {/* store type */}
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Store Type</span>
            <select
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
              {...register('storeType', { required: true })}
            >
              <option value="DAZZLE">DAZZLE</option>
              <option value="DAZZLE_PREMIUM">DAZZLE PREMIUM</option>
              <option value="DAZZLE_OUTLET">DAZZLE OUTLET</option>
              <option value="WAREHOUSE">WAREHOUSE</option>
            </select>
          </label>
          {errors.storeType && (
            <p className="text-red-500 my-3">Store type is required</p>
          )}

          {/* Store Location */}
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Store Location
            </span>
            <input
              {...register('storeLocation', { required: true })}
              type="text"
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              // placeholder="PAULI"
            />
          </label>
          {errors.storeLocation && (
            <p className="text-red-500 my-3">Store location is required</p>
          )}

          {/* manager */}

          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Store Manager
            </span>
            <select
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
              {...register('manager', { required: true })}
            >
              {users?.data.map((user) => (
                <option value={user?.userId}>{user?.userCode}</option>
              ))}
            </select>
          </label>
          {errors.manager && (
            <p className="text-red-500 my-3">Store manager is required</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Create Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStore;
