import classNames from 'classnames';
import { Grid, GridProps, Link, Heading } from '@aws-amplify/ui-react';

interface CardLinkProps {
  href: string;
  title: string;
  desc: string;
  icon?: React.ReactNode;
  className?: string;
  iconAlign?: 'center' | 'top';
  variation?: 'plain' | 'branded';
}

export function CardLink({
  href,
  title,
  desc,
  icon,
  iconAlign = 'center',
  variation = 'plain',
  className,
}: CardLinkProps) {
  const classes = classNames(
    `docs-cardLink`,
    `docs-cardLink--${variation}`,
    `docs-cardLink--icon-${iconAlign}`,
    className
  );

  return (
    <Link href={href} className={classes}>
      {icon && <div className="docs-cardLink-img">{icon}</div>}
      <div className="docs-cardLink-details">
        <div className="docs-cardLink-title">{title}</div>
        <div className="docs-cardLink-desc">{desc}</div>
      </div>
    </Link>
  );
}

interface CardLinkGroupProps extends GridProps {
  title?: string;
  id?: string;
  children: React.ReactNode;
}

export function CardLinkGroup({
  title,
  children,
  templateColumns = { base: '1fr', large: '1fr 1fr' },
  id,
  gap = 'large',
}: CardLinkGroupProps) {
  return (
    <>
      {title ? (
        <Heading id={id} className="docs-cardLinkGroup-title" level={2}>
          {title}
        </Heading>
      ) : null}
      <Grid
        className="docs-cardLinkGroup"
        gap={gap}
        templateColumns={templateColumns}
      >
        {children}
      </Grid>
    </>
  );
}
