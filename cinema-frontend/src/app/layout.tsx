// src/app/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <nav>
          <a href="/">Trang Chủ</a>
          <a href="/movies">Phim</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
