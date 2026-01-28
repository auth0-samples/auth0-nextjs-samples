export const metadata = {
  title: "Auth0 Next.js Sample",
  description: "A sample Next.js application using Auth0 for authentication.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
