import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <Link to="/storage/storage-manager">Storage Manager</Link>
      {/* all the other elements */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
