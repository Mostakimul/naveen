import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  useCreateAdminMutation,
  useCreateManagerMutation,
} from '../../../redux/features/admin/userManagement.api';

const CreateUser = () => {
  const [createAdmin] = useCreateAdminMutation();
  const [createManager] = useCreateManagerMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userCode: '',
      password: '',
      role: '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Logging In...');

    try {
      const userInfo = {
        userCode: data.userCode,
        password: data.password,
        role: data.role,
      };

      let result = null;

      if (userInfo?.role === 'ADMIN') {
        result = await createAdmin(userInfo);
      } else {
        result = await createManager(userInfo);
      }

      if (result?.data?.success) {
        toast.success('User created successfully!', {
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
          Create User
        </h2>
      </header>
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">User Code</span>
            <input
              {...register('userCode', { required: true })}
              type="text"
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="PAULI"
            />
          </label>
          {errors.userCode && (
            <p className="text-red-500 my-3">User Code is required</p>
          )}
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Password</span>
            <input
              {...register('password', { required: true })}
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="***************"
              type="password"
            />
          </label>
          {errors.password && (
            <p className="text-red-500 my-3">Password is required</p>
          )}

          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Role</span>
            <select
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
              {...register('role', { required: true })}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="STORE_MANAGER">STORE MANAGER</option>
              <option value="WAREHOUSE_MANAGER">WAREHOUSE MANAGER</option>
              <option value="RESTAURANT_MANAGER">RESTAURANT MANAGER</option>
            </select>
          </label>
          {errors.role && <p className="text-red-500 my-3">Role is required</p>}
          <button
            type="submit"
            className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
