import { PathMeta } from '@/data/meta';
import { Button } from '@aws-amplify/ui-react';
import { useNavigationContext } from 'src/hooks/useNavigationContext';

export const pageMeta: PathMeta = {
  frontmatter: {
    title: 'Create a form!',
    description: `We're creating a form!!`,
  },
};

const CreateForm = () => {
  const { setAlwaysCollapsible } = useNavigationContext();
  setAlwaysCollapsible(true);
  return (
    <>
      <div>do you want to build a form?</div>
    </>
  );
};

export default CreateForm;
