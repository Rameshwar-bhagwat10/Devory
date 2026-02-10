import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-border-default">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-text-primary">Devory</div>
        <div className="flex gap-4">
          <Link href="/" className="text-text-secondary hover:text-primary">
            Home
          </Link>
          <Link
            href="/projects"
            className="text-text-secondary hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="/community"
            className="text-text-secondary hover:text-primary"
          >
            Community
          </Link>
        </div>
      </div>
    </nav>
  );
}
