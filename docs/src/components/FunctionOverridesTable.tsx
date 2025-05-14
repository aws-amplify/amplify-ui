import {
  ResponsiveTable,
  ResponsiveTableCell,
} from '@/components/ResponsiveTable';
import {
  Tabs,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import {
  Framework,
  CURRENT_MAJOR_VERSIONS,
  AMPLIFY_5_UI_VERSIONS,
} from '../data/frameworks';

export const FunctionOverridesTable = ({ framework }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  if (!framework) {
    framework = platform as Framework;
  }

  const latestVersion = CURRENT_MAJOR_VERSIONS[framework].toString();
  const amplify5FrameworkVersion = AMPLIFY_5_UI_VERSIONS[framework].toString();
  return (
    <Tabs.Container defaultValue={latestVersion}>
      <Tabs.List>
        <Tabs.Item value={latestVersion}>
          <code>@aws-amplify/ui-{framework}</code> v{latestVersion} (latest)
        </Tabs.Item>
        <Tabs.Item value={amplify5FrameworkVersion}>
          <code>@aws-amplify/ui-{framework}</code> v{amplify5FrameworkVersion}
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel value={latestVersion}>
        <ResponsiveTable labelWidth="10rem">
          <TableHead>
            <TableRow>
              <TableCell as="th">Auth Function Call</TableCell>
              <TableCell as="th">Override Name</TableCell>
              <TableCell as="th">input Properties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>signUp</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleSignUp</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="input Properties">
                <code>{`{username, password}`}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>signIn</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleSignIn</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="input Properties">
                <code>{'{username, password}'}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>confirmSignIn</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleConfirmSignIn</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="input Properties">
                <code>{'{challengeResponse}'}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>confirmSignUp</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleConfirmSignUp</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="input Properties">
                <code>{'{username, confirmationCode}'}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>resendSignUpCode</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleResendSignUpCode</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="input Properties">
                <code>{'{username}'}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>resetPassword</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleForgotPassword</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="input Properties">
                <code>{'{username}'}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>confirmResetPassword</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleForgotPasswordSubmit</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="input Properties">
                <code>{'{username, newPassword, confirmationCode}'}</code>
              </ResponsiveTableCell>
            </TableRow>
          </TableBody>
        </ResponsiveTable>
      </Tabs.Panel>
      <Tabs.Panel value={amplify5FrameworkVersion}>
        <ResponsiveTable labelWidth="10rem">
          <TableHead>
            <TableRow>
              <TableCell as="th">Function Call</TableCell>
              <TableCell as="th">Override Name</TableCell>
              <TableCell as="th">formData Properties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>Auth.signUp</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleSignUp</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="formData Properties">
                <code>{'{username, password, attributes}'}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>Auth.signIn</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleSignIn</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="formData Properties">
                <code>{'{username, password}'}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>Auth.confirmSignIn</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleConfirmSignIn</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="formData Properties">
                <code>{'{user, code, mfaType}'}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>Auth.confirmSignUp</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleConfirmSignUp</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="formData Properties">
                <code>{'{username, code}'}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>Auth.resendSignUpCode</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleResendSignUpCode</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="formData Properties">
                <code>{'{username}'}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>Auth.forgotPassword</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleForgotPassword</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="formData Properties">
                <code>{`{username}`}</code>
              </ResponsiveTableCell>
            </TableRow>
            <TableRow>
              <ResponsiveTableCell label="Function Call">
                <code>Auth.forgotPasswordSubmit</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="Override Name">
                <code>handleForgotPasswordSubmit</code>
              </ResponsiveTableCell>
              <ResponsiveTableCell label="formData Properties">
                <code>{'{username, code, password}'}</code>
              </ResponsiveTableCell>
            </TableRow>
          </TableBody>
        </ResponsiveTable>
      </Tabs.Panel>
    </Tabs.Container>
  );
};
