import Client from '@/components/Client';
import Stat from '@/components/Stat';
import Wizard from '@/components/Wizard';
import theme from '@/theme';

export default async function Home() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          I am from the server!!
          <div
            style={{
              backgroundColor: theme.tokens.colors.blue[60].toString(),
            }}
          >
            Hello
          </div>
          <Wizard variation="primary" />
          <Wizard />
          <Stat label="testing" />
          <Stat label="testing" variation="primary" />
          <Client />
        </main>
      );
    }, 1000);
  });
}
