import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>assignment</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
