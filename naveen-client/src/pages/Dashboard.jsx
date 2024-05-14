import React, { useState } from 'react';

import StatCard from '../components/StatCard';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import { useGetMetaDataQuery } from '../redux/features/admin/metaData.api';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: meta, isError, error, isLoading } = useGetMetaDataQuery();
  const { userCount, storeCount, itemRequestCount } = meta?.data;

  return (
    <div>
      <WelcomeBanner />
      {meta?.data && !isError && (
        <div>
          <div className="flex justify-around gap-10">
            <StatCard title={'Total Users'} value={userCount} />
            <StatCard title={'Total Stores'} value={storeCount} />
            <StatCard title={'Items Requested'} value={itemRequestCount} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
