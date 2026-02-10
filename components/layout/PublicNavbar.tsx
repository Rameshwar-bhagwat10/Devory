export default function PublicNavbar() {
  return (
    <nav className="border-b border-border-default">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-text-primary">Devory</div>
        <a
          href="/auth"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-soft"
        >
          Login
        </a>
      </div>
    </nav>
  );
}
