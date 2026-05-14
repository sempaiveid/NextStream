export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen overflow-hidden flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 p-8">
        <span className="text-brand font-bold text-2xl tracking-widest">
          NEXTSTREAM
        </span>
      </div>

      <div className="relative z-10 flex-1">{children}</div>
    </div>
  );
}
