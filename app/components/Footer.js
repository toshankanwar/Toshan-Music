'use client'

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Top content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center shadow-lg shadow-spotify-green/20">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-extrabold text-white leading-tight">Toshan Music</p>
                <p className="text-sm text-white/50 font-semibold">A clean Spotify‑style library UI</p>
              </div>
            </div>

            <p className="text-sm text-white/60 leading-relaxed">
              Browse tracks, filter by genres, and open any song for a focused player experience.
              Built with Next.js + Tailwind for speed and smooth UI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-bold text-white/80 tracking-wide uppercase mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home / Library
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Browse Genres
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Latest Tracks
                </a>
              </li>
            </ul>
          </div>

          {/* Creator / Contact */}
          <div>
            <p className="text-sm font-bold text-white/80 tracking-wide uppercase mb-3">Creator</p>

            <p className="text-sm text-white/60 leading-relaxed">
              Designed &amp; Developed with{' '}
              <span className="inline-flex align-middle mx-1" aria-label="love">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </span>
              by{' '}
              <a
                href="https://toshankanwar.in"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-white hover:text-spotify-green transition-colors"
              >
                Toshan Kanwar
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}