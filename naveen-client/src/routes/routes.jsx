import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProtectedRoute from '../layout/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import AllSale from '../pages/admin/saleManagement/AllSale';
import AllStore from '../pages/admin/storeManagement/AllStore';
import CreateStore from '../pages/admin/storeManagement/CreateStore';
import AllUsers from '../pages/admin/userManagement/AllUsers';
import CreateUser from '../pages/admin/userManagement/CreateUser';
import EditUser from '../pages/admin/userManagement/EditUser';
import AddSale from '../pages/manager/AddSale';
import MySale from '../pages/manager/MySale';
import RequestItem from '../pages/manager/RequestItem';
import RequestedItems from '../pages/manager/RequestedItems';

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
      {
        path: '/sales/all-sales',
        element: (
          <ProtectedRoute>
            <AllSale />
          </ProtectedRoute>
        ),
      },
      {
        path: '/sales/add-sales',
        element: (
          <ProtectedRoute>
            <AddSale />
          </ProtectedRoute>
        ),
      },
      {
        path: '/sales/my-sales',
        element: (
          <ProtectedRoute>
            <MySale />
          </ProtectedRoute>
        ),
      },
      {
        path: '/items/request-item',
        element: (
          <ProtectedRoute>
            <RequestItem />
          </ProtectedRoute>
        ),
      },
      {
        path: '/items/my-requests',
        element: (
          <ProtectedRoute>
            <RequestedItems />
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
