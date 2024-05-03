import { toast } from 'sonner';
import { useSoftDeleteUserMutation } from '../../redux/features/admin/userManagement.api';

const UserList = ({ user }) => {
  const { userCode, role, userId } = user || {};

  const [softDeleteUser, { error, isSuccess }] = useSoftDeleteUserMutation();

  const handleDelete = (userId) => {
    softDeleteUser(userId);
  };

  if (isSuccess) {
    toast.success('User deleted successfully!');
  }

  if (error) {
    toast.error(error.data?.message);
  }

  return (
    <tr className="text-center">
      <td className="border border-slate-600">{userCode}</td>
      <td className="border border-slate-600">{role}</td>
      <td className="border border-slate-600 space-x-2">
        <button
          onClick={() => handleDelete(userId)}
          className="btn btn-sm  btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserList;
