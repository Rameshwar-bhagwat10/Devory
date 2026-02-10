export default function AuthNavbar() {
  return (
    <nav className="border-b border-border-default">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-text-primary">Devory</div>
        <div className="flex gap-4 items-center">
          <a href="/dashboard" className="text-text-secondary hover:text-primary">
            Dashboard
          </a>
          <a href="/profile" className="text-text-secondary hover:text-primary">
            Profile
          </a>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
