import { Heading, Text, useTheme } from '@aws-amplify/ui-react';
import { ComponentsSidebar } from './ComponentsSidebar';

export default function Page({
  children,
  frontmatter,
}: {
  children: any;
  frontmatter?: any;
}) {
  const {title, description} = frontmatter;
  const { tokens } = useTheme();
  
  return (
    <div className="docs-main">
      <ComponentsSidebar />
      <main className="docs-content">
      <section className="docs-meta">
        <Heading level={1}>{title}</Heading>
        <Text fontSize={`${tokens.fontSizes.xl}`} className="docs-description">{description}</Text>
      </section>
      {children}
      </main>
    </div>
  )
}
