import React from 'react';

const StatCard = ({ title, value = 0 }) => {
  return (
    <div className="stats bg-primary text-primary-content h-40 w-full text-center">
      <div className="stat">
        <div className="stat-title text-3xl text-gray-200">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
