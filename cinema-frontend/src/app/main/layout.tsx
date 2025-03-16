export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="vi">
        <body>
          <header>
            <nav>Navbar</nav>
          </header>
          <main>{children}</main>
          <footer>Footer</footer>
        </body>
      </html>
    );
  }
  