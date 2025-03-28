import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Flex, Heading } from '@aws-amplify/ui-react';

import SBExamples from './storage-browser';

const ExampleLinks = () => {
  const { pathname: _pathname } = useLocation();
  const pathname = `${_pathname}${_pathname.endsWith('/') ? '' : '/'}`;

  return (
    <Flex direction="column">
      <Heading level={3}>StorageBrowser</Heading>
      {SBExamples.map(({ payload, subpath, title }) => (
        <Link
          key={subpath}
          to={`${pathname}storage-browser/${subpath}${payload}`}
        >
          {title}
        </Link>
      ))}
    </Flex>
  );
};

export default function App() {
  return (
    <Routes>
      <Route index element={<ExampleLinks />} />
      <Route path="storage-browser">
        {SBExamples.map(({ Page, subpath, params }) => (
          <Route key={subpath} path={subpath}>
            <Route index element={<Page />} />
            <Route path={params} element={<Page />} />
          </Route>
        ))}
      </Route>
    </Routes>
  );
}
