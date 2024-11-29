import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { createLink } from './utils';

export default function RouteLink() {
  const [link, setlink] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    createLink(
      `${pathname.endsWith('/') ? pathname : `${pathname}/`}default-value`,
      'demo-folder/copy-test/'
    ).then(setlink);
  }, [pathname]);

  return <Link to={link}>Hey</Link>;
}
