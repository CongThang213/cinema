export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-container">
      <h2>Main Section</h2>
      {children}
    </div>
  );
}
