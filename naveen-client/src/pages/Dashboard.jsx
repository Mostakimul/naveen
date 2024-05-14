import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import StatCard from '../components/StatCard';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import { useGetMetaDataQuery } from '../redux/features/admin/metaData.api';
import { selectCurrentUser } from '../redux/features/auth/authSlice';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { data, isError, error, isLoading } = useGetMetaDataQuery();

  return (
    <div>
      <WelcomeBanner />
      {user?.role == 'ADMIN' && data?.meta && !isLoading && (
        <div>
          <div className="flex justify-around gap-10">
            <StatCard title={'Total Users'} value={data?.meta?.userCount} />
            <StatCard title={'Total Stores'} value={data?.meta?.storeCount} />
            <StatCard
              title={'Items Requested'}
              value={data?.meta?.itemRequestCount}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
