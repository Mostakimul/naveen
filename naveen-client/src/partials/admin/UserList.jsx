const UserList = ({ user }) => {
  const { userCode, role, userId } = user || {};

  // const [modalOpen, setModalOpen] = useState(false);
  // const [deleteQuiz, { isError, error }] = useDeleteQuizMutation();

  // const handleOpenModal = () => {
  //   setModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  // };

  // const handleDelete = (id) => {
  //   deleteQuiz(id);
  // };

  return (
    <tr className="text-center">
      <td className="border border-slate-600">{userCode}</td>
      <td className="border border-slate-600">{role}</td>
      <td className="border border-slate-600 space-x-2">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserList;
