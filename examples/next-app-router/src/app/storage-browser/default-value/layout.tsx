import { Suspense } from 'react';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="flex w-full flex-row">
        <div className="flex-1 p-2">{children}</div>
      </div>
    </Suspense>
  );
}
