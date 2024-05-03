import Error from '../../../components/Error';
import UserList from '../../../partials/admin/UserList';
import { useGetAllUsersQuery } from '../../../redux/features/admin/userManagement.api';

const AllUsers = () => {
  const {
    data: users,
    isError,
    error,
    isLoading,
  } = useGetAllUsersQuery() || {};
  let content = null;

  if (isLoading) {
    content = (
      <tr>
        <td className="m-2 text-center">Loading...</td>
      </tr>
    );
  } else if (!isLoading && isError) {
    content = (
      <tr>
        <td className="m-2 text-center">
          <Error message={error?.data} />
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && users?.data?.length === 0) {
    content = (
      <tr>
        <td className="m-2 text-center">No users found!</td>
      </tr>
    );
  } else if (!isLoading && !isError && users?.data?.length > 0) {
    content = users?.data.map((user) => (
      <UserList key={user.userId} user={user} />
    ));
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All Users
        </h2>
      </header>

      <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th className="border border-slate-600">User Code</th>
                <th className="border border-slate-600">Role</th>
                <th className="border border-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
