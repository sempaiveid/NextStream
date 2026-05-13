export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 z-0">{children}</div>
    </div>
  );
}
