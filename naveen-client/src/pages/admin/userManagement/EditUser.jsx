import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from '../../../redux/features/admin/userManagement.api';

const EditUser = () => {
  const { userId } = useParams();
  const { data: user } = useGetSingleUserQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userCode: user?.data?.userCode || '',
      role: user?.data?.role || '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Loading...');

    try {
      const userInfo = {
        userId,
        userCode: data.userCode,
        role: data.role,
      };

      const result = await updateUser(userInfo);

      if (result?.data?.success) {
        toast.success('User updated successfully!', {
          id: toastId,
          duration: 2000,
        });
        navigate('/users/all-users');
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
          Edit User
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
            />
          </label>
          {errors.userCode && (
            <p className="text-red-500 my-3">User Code is required</p>
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
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
