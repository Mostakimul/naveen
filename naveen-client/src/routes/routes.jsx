import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProtectedRoute from '../layout/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import AllUsers from '../pages/admin/userManagement/AllUsers';
import CreateUser from '../pages/admin/userManagement/CreateUser';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users/all-users',
        element: (
          <ProtectedRoute>
            <AllUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users/create-user',
        element: (
          <ProtectedRoute>
            <CreateUser />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },

  // {
  //   path: '/signup',
  //   element: <Signup />,
  // },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

export default routes;
