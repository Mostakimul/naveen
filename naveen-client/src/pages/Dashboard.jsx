import React, { useState } from 'react';

import WelcomeBanner from '../partials/dashboard/WelcomeBanner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <WelcomeBanner />;
}

export default Dashboard;
