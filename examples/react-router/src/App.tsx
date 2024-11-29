import { Routes, Route } from 'react-router-dom';

import SBExamples from './storage-browser';

export default function App() {
  return (
    <Routes>
      <Route path="storage-browser">
        <Route index element={<SBExamples.RouteLink />} />
        <Route
          path="controlled-value"
          element={<SBExamples.ControlledValue />}
        />
        <Route path="default-value">
          <Route index element={<SBExamples.DefaultValue />} />
          <Route
            path="l/:location/p?/:path"
            element={<SBExamples.DefaultValue />}
          />
        </Route>
        <Route path="search-params" element={<SBExamples.SearchParams />} />
      </Route>
    </Routes>
  );
}
