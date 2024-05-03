import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProtectedRoute from '../layout/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import AllStore from '../pages/admin/storeManagement/AllStore';
import CreateStore from '../pages/admin/storeManagement/CreateStore';
import AllUsers from '../pages/admin/userManagement/AllUsers';
import CreateUser from '../pages/admin/userManagement/CreateUser';
import EditUser from '../pages/admin/userManagement/EditUser';

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
        path: '/users/edit-user/:userId',
        element: (
          <ProtectedRoute>
            <EditUser />
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
      {
        path: '/store/all-stores',
        element: (
          <ProtectedRoute>
            <AllStore />
          </ProtectedRoute>
        ),
      },
      {
        path: '/store/create-store',
        element: (
          <ProtectedRoute>
            <CreateStore />
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
