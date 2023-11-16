import { Fragment } from '@/components/Fragment';
import { Tabs } from '@aws-amplify/ui-react';

export const InitialStateTabs = () => {
  return (
    <Tabs.Container defaultValue="sign-in">
      <Tabs.List>
        <Tabs.Item value="sign-in">Sign In</Tabs.Item>
        <Tabs.Item value="sign-up">Sign Up</Tabs.Item>
        <Tabs.Item value="forgot-password">Forgot Password</Tabs.Item>
      </Tabs.List>
      <Tabs.Panel value="sign-in">
        <Fragment>
          {({ platform }) => import(`./initialState.signIn.${platform}.mdx`)}
        </Fragment>
        <Fragment platforms={['web', 'flutter']} useCommonWebContent>
          {({ platform }) =>
            import(`./initialState.signIn.example.${platform}.mdx`)
          }
        </Fragment>
      </Tabs.Panel>
      <Tabs.Panel value="sign-up">
        <Fragment>
          {({ platform }) => import(`./initialState.signUp.${platform}.mdx`)}
        </Fragment>
        <Fragment platforms={['web', 'flutter']} useCommonWebContent>
          {({ platform }) =>
            import(`./initialState.signUp.example.${platform}.mdx`)
          }
        </Fragment>
      </Tabs.Panel>
      <Tabs.Panel value="forgot-password">
        <Fragment>
          {({ platform }) =>
            import(`./initialState.forgotPassword.${platform}.mdx`)
          }
        </Fragment>
        <Fragment platforms={['web', 'flutter']} useCommonWebContent>
          {({ platform }) =>
            import(`./initialState.forgotPassword.example.${platform}.mdx`)
          }
        </Fragment>
      </Tabs.Panel>
    </Tabs.Container>
  );
};
