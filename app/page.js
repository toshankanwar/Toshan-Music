'use client'

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { musicData } from '../data/data';
import PWAInstallPrompt from './components/PWAInstallPrompt';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title-asc');
  const [viewMode, setViewMode] = useState('grid');

  const genres = useMemo(() => ['All', ...new Set(musicData.map(track => track.genre))], []);

  const filteredMusic = useMemo(() => {
    let filtered = musicData.filter(track => {
      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre = selectedGenre === 'All' || track.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        case 'artist-asc': return a.artist.localeCompare(b.artist);
        case 'artist-desc': return b.artist.localeCompare(a.artist);
        case 'year-asc': return a.year - b.year;
        case 'year-desc': return b.year - a.year;
        default: return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black">
     <PWAInstallPrompt />
      {/* ========== DESKTOP NAVBAR ========== */}
      <header className="hidden lg:block sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-7xl mx-23 px-6">
          <div className="flex items-center h-20 gap-8">
            {/* Logo */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Toshan Music</span>
            </div>

            {/* Search Bar (NO SEARCH ICON) */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="                                         Search songs, artists, albums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-5 pr-4 bg-zinc-800 text-white text-lg rounded-full border-2 border-transparent focus:border-spotify-green focus:outline-none placeholder:text-zinc-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-zinc-700 hover:bg-zinc-600 rounded-full transition-colors"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Track Count Badge */}
            <div className="px-5 py-2.5 bg-zinc-800 rounded-full flex-shrink-0">
              <span className="text-lg font-bold text-spotify-green">{filteredMusic.length}</span>
              <span className="text-lg font-medium text-zinc-400 ml-2">Tracks</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========== MOBILE NAVBAR (FIXED: no overlap, remove duplicate sort/view) ========== */}
      <header className="lg:hidden sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="px-4 py-4 space-y-3">
          {/* Row 1: Logo + Vibes + Count */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              
            </div>

       

            
            <div className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="   Search songs, artists, albums...?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-77 h-8 pl-40 pr-10 bg-zinc-800 text-white text-sm rounded-full border-2 border-transparent focus:border-spotify-green focus:outline-none placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-zinc-700 rounded-full"
                  aria-label="Clear search"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="ml-auto px-3 py-1.5 bg-zinc-800 rounded-full flex-shrink-0">
              <span className="text-sm font-bold text-spotify-green">{filteredMusic.length}</span>
            </div>
          </div>

     
        </div>
      </header>

      {/* ========== FILTERS SECTION ========== */}
      <section className="sticky top-[12px] lg:top-20 z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/95 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-9xl mx-auto px-4 lg:px-1 py-4 lg:py-5">
          <div className="flex flex-col gap-4">

            {/* Row: Genres left + Sort/View right (DESKTOP/PC ONLY CHANGE) */}
            <div className="flex items-center gap-4">
              {/* Genre Pills - Horizontal Scroll */}
              <div className="flex-1 overflow-x-auto scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
                <div className="flex gap-3 min-w-max">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-6 py-3 rounded-full text-base font-semibold whitespace-nowrap transition-all
                        ${selectedGenre === genre
                          ? 'bg-spotify-green text-black'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                        }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort + View on the RIGHT END (shifted) */}
              <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-12 px-5 bg-zinc-800 text-white text-base font-medium rounded-lg border-2 border-transparent focus:border-spotify-green focus:outline-none cursor-pointer"
                >
                  <option value="title-asc" className="bg-zinc-900">Title A-Z</option>
                  <option value="title-desc" className="bg-zinc-900">Title Z-A</option>
                  <option value="artist-asc" className="bg-zinc-900">Artist A-Z</option>
                  <option value="artist-desc" className="bg-zinc-900">Artist Z-A</option>
                  <option value="year-desc" className="bg-zinc-900">Newest First</option>
                  <option value="year-asc" className="bg-zinc-900">Oldest First</option>
                </select>

                <div className="flex bg-zinc-800 rounded-lg p-1.5 gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`w-10 h-10 flex items-center justify-center rounded-md transition-all
                      ${viewMode === 'grid' ? 'bg-spotify-green text-black' : 'text-zinc-400 hover:text-white'}`}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`w-10 h-10 flex items-center justify-center rounded-md transition-all
                      ${viewMode === 'list' ? 'bg-spotify-green text-black' : 'text-zinc-400 hover:text-white'}`}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="3" rx="1" />
                      <rect x="3" y="10.5" width="18" height="3" rx="1" />
                      <rect x="3" y="17" width="18" height="3" rx="1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile: keep sort/view as before (only in this section, not in header) */}
            <div className="flex items-center justify-between gap-4 lg:hidden">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 flex-1 px-5 bg-zinc-800 text-white text-base font-medium rounded-lg border-2 border-transparent focus:border-spotify-green focus:outline-none cursor-pointer"
              >
                <option value="title-asc" className="bg-zinc-900">Title A-Z</option>
                <option value="title-desc" className="bg-zinc-900">Title Z-A</option>
                <option value="artist-asc" className="bg-zinc-900">Artist A-Z</option>
                <option value="artist-desc" className="bg-zinc-900">Artist Z-A</option>
                <option value="year-desc" className="bg-zinc-900">Newest First</option>
                <option value="year-asc" className="bg-zinc-900">Oldest First</option>
              </select>

              <div className="flex bg-zinc-800 rounded-lg p-1.5 gap-1 flex-shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`w-10 h-10 flex items-center justify-center rounded-md transition-all
                    ${viewMode === 'grid' ? 'bg-spotify-green text-black' : 'text-zinc-400 hover:text-white'}`}
                  aria-label="Grid view"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`w-10 h-10 flex items-center justify-center rounded-md transition-all
                    ${viewMode === 'list' ? 'bg-spotify-green text-black' : 'text-zinc-400 hover:text-white'}`}
                  aria-label="List view"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="3" rx="1" />
                    <rect x="3" y="10.5" width="18" height="3" rx="1" />
                    <rect x="3" y="17" width="18" height="3" rx="1" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <div className="mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-2">
            {searchQuery ? `Results for "${searchQuery}"` : selectedGenre === 'All' ? 'All Tracks' : selectedGenre}
          </h2>
          <p className="text-lg lg:text-xl text-zinc-400">
            {filteredMusic.length} {filteredMusic.length === 1 ? 'song' : 'songs'} available
          </p>
        </div>

        {viewMode === 'grid' && filteredMusic.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {filteredMusic.map((track) => (
              <Link key={track.id} href={`/music/${track.slug}`} className="group block">
                <div className="bg-zinc-800/50 hover:bg-zinc-800 p-4 lg:p-5 rounded-xl transition-all duration-300">
                  <div className="relative aspect-square mb-4 rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-spotify-green rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                        <svg className="w-6 h-6 lg:w-7 lg:h-7 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-base lg:text-lg mb-1 truncate group-hover:text-spotify-green transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-sm lg:text-base text-zinc-400 truncate mb-2">
                    {track.artist}
                  </p>
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-zinc-500">
                    <span>{track.duration}</span>
                    <span>•</span>
                    <span>{track.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {viewMode === 'list' && filteredMusic.length > 0 && (
          <div className="space-y-2">
            <div className="hidden lg:grid grid-cols-[50px_80px_1fr_150px_100px_60px] gap-4 px-4 py-3 text-sm font-medium text-zinc-500 border-b border-zinc-800">
              <span>#</span>
              <span></span>
              <span>TITLE</span>
              <span>ALBUM</span>
              <span>DURATION</span>
              <span></span>
            </div>

            {filteredMusic.map((track, index) => (
              <Link key={track.id} href={`/music/${track.slug}`} className="group block">
                <div className="hidden lg:grid grid-cols-[50px_80px_1fr_150px_100px_60px] gap-4 items-center px-4 py-3 rounded-lg hover:bg-zinc-800/70 transition-colors">
                  <span className="text-lg font-medium text-zinc-500 group-hover:text-white text-center">
                    {index + 1}
                  </span>
                  <img src={track.coverUrl} alt={track.title} className="w-14 h-14 rounded-md object-cover" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg text-white truncate group-hover:text-spotify-green transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-base text-zinc-400 truncate">{track.artist}</p>
                  </div>
                  <span className="text-base text-zinc-400 truncate">{track.album}</span>
                  <span className="text-base text-zinc-400">{track.duration}</span>
                  <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="lg:hidden flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/70 transition-colors">
                  <span className="text-base font-medium text-zinc-500 w-8 text-center">{index + 1}</span>
                  <img src={track.coverUrl} alt={track.title} className="w-14 h-14 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base text-white truncate">{track.title}</h3>
                    <p className="text-sm text-zinc-400 truncate">{track.artist}</p>
                  </div>
                  <span className="text-sm text-zinc-500">{track.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredMusic.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 lg:py-32">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-zinc-800 rounded-full flex items-center justify-center mb-8">
              <svg className="w-12 h-12 lg:w-16 lg:h-16 text-zinc-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl lg:text-4xl font-bold text-white mb-3 text-center">No tracks found</h3>
            <p className="text-lg lg:text-xl text-zinc-400 mb-8 text-center max-w-md">
              We couldn't find any music matching your search. Try different keywords.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => { setSearchQuery(''); setSelectedGenre('All'); }}
                className="px-8 py-4 bg-spotify-green text-black text-lg font-bold rounded-full hover:scale-105 transition-transform"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER REMOVED (as requested) */}
    </div>
  );
}