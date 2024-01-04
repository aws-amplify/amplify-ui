import { PageTabLayout } from '@/components/Layout/PageTabLayout';
import { PropsTableTab } from '@/components/propsTable/PropsTableTab';

export const PrimitiveTabs = ({ children, htmlElement, mdnUrl, title }) => {
  return (
    <PageTabLayout
      tabComponents={[
        { title: 'Documentation', children },
        {
          title: 'Props',
          children: (
            <PropsTableTab
              componentName={title}
              htmlElement={htmlElement}
              mdnUrl={mdnUrl}
            />
          ),
        },
      ]}
    />
  );
};
