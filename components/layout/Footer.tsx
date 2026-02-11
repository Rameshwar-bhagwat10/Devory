export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border-10 bg-glass-5 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-text-90 font-semibold mb-1">Devory</p>
          <p className="text-sm text-text-60">
            &copy; {currentYear} Devory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
