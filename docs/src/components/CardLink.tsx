import Link from 'next/link';

interface CardLinkProps {
  href: string;
  title: string;
  desc: string;
  img: React.ReactNode;
}

export function CardLink({ href, title, desc, img }: CardLinkProps) {
  return (
    <Link href={href}>
      <a className="docs-cardLink">
        {img && <div className="docs-cardLink-img">{img}</div>}
        <div className="docs-cardLink-details">
          <span className="docs-cardLink-title">{title}</span>
          <span className="docs-cardLink-desc">{desc}</span>
        </div>
      </a>
    </Link>
  );
}
