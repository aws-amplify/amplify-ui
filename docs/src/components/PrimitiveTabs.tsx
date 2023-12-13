import { PageTabLayout } from '@/components/Layout/PageTabLayout';
import { PropsTableTab } from '@/components/propsTable/PropsTableTab';
import data from '@/data/props-table.json';

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
              PropsData={data}
              htmlElement={htmlElement}
              mdnUrl={mdnUrl}
            />
          ),
        },
      ]}
    />
  );
};
