// Root layout — required by Next.js 14 App Router.
// Actual UI is in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
