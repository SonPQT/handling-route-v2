import React from 'react';
import { Navigate } from 'react-router-dom';

interface StatsProps {
  user: { username: string } | null;
}

export function Stats({ user }: StatsProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Stats View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}