import React from 'react';

const CreateUser = () => {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Create User
        </h2>
      </header>
      <div className="p-5">
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-400">User Code</span>
          <input
            type="text"
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            placeholder="PAULI"
          />
        </label>
        <label className="block mt-4 text-sm">
          <span className="text-gray-700 dark:text-gray-400">Password</span>
          <input
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            placeholder="***************"
            type="password"
          />
        </label>

        <label className="block mt-4 text-sm">
          <span className="text-gray-700 dark:text-gray-400">Role</span>
          <select
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
            defaultValue="ADMIN"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="STORE_MANAGER">STORE MANAGER</option>
            <option value="WAREHOUSE_MANAGER">WAREHOUSE MANAGER</option>
            <option value="RESTAURANT_MANAGER">RESTAURANT MANAGER</option>
          </select>
        </label>

        <a
          className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          href="../index.html"
        >
          Create User
        </a>
      </div>
    </div>
  );
};

export default CreateUser;
