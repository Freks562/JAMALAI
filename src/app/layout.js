export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body style={{fontFamily:"sans-serif",padding:20}}>{children}</body>
    </html>
  );
}
