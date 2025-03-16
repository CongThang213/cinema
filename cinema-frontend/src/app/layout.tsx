export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          <nav>
            <h1>My Cinema Website</h1>
          </nav>
          <main>{children}</main>
        </body>
      </html>
    );
  }
  