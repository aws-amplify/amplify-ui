import Link from 'next/link';
import { useTheme } from '@aws-amplify/ui-react';

export function CardLink({ href, title, desc, img }) {
  return (
    <Link href={href}>
      <a className="docs-cardLink">
        <div className="docs-cardLink-img">{img}</div>
        <div className="docs-cardLink-details">
          <span className="docs-cardLink-title">{title}</span>
          <span className="docs-cardLink-desc">{desc}</span>
        </div>
      </a>
    </Link>
  );
}
