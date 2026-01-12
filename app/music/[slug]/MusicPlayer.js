'use client'

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function MusicPlayer({ track, prevTrack, nextTrack }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // When track changes, reset state and pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [track?.audioUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      // autoplay can fail on some mobile browsers until user interacts
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const seekTime = (Number(e.target.value) / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = Number(e.target.value) / 100;
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Back */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline font-semibold">Back to Library</span>
              <span className="sm:hidden font-semibold">Back</span>
            </Link>

            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              {prevTrack ? (
                <Link
                  href={`/music/${prevTrack.slug}`}
                  className="px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  aria-label="Previous track"
                  title="Previous"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                  </svg>
                </Link>
              ) : (
                <button
                  className="px-3 py-2 rounded-full bg-white/5 border border-white/10 opacity-40 cursor-not-allowed"
                  disabled
                  aria-label="Previous track (disabled)"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                  </svg>
                </button>
              )}

              {nextTrack ? (
                <Link
                  href={`/music/${nextTrack.slug}`}
                  className="px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  aria-label="Next track"
                  title="Next"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                  </svg>
                </Link>
              ) : (
                <button
                  className="px-3 py-2 rounded-full bg-white/5 border border-white/10 opacity-40 cursor-not-allowed"
                  disabled
                  aria-label="Next track (disabled)"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width / Full-height layout */}
      <main className="w-full px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
        {/* Desktop: 2-column (cover left, controls right). Mobile: stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] xl:grid-cols-[600px_1fr] gap-6 lg:gap-10 items-start">
          {/* LEFT: Album Art (big on PC, responsive on mobile) */}
          <section className="lg:sticky lg:top-24">
            <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
              <div className="aspect-square">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Track quick info under cover (desktop looks good, mobile too) */}
            <div className="mt-5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                {track.title}
              </h1>
              <p className="mt-2 text-lg sm:text-xl text-white/70 font-semibold">
                {track.artist}
              </p>
              <p className="mt-1 text-sm sm:text-base text-white/45">
                {track.album} • {track.year} • {track.genre}
              </p>
            </div>
          </section>

          {/* RIGHT: Controls (uses full remaining space on PC) */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            {/* Big Play row */}
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              {/* Prev */}
              {prevTrack ? (
                <Link
                  href={`/music/${prevTrack.slug}`}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                  </svg>
                </Link>
              ) : (
                <button
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/10 flex items-center justify-center opacity-40 cursor-not-allowed"
                  disabled
                  aria-label="Previous (disabled)"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                  </svg>
                </button>
              )}

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-spotify-green hover:bg-spotify-darkgreen rounded-full 
                           flex items-center justify-center shadow-xl hover:scale-105 transition-all"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              {/* Next */}
              {nextTrack ? (
                <Link
                  href={`/music/${nextTrack.slug}`}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                  </svg>
                </Link>
              ) : (
                <button
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/10 flex items-center justify-center opacity-40 cursor-not-allowed"
                  disabled
                  aria-label="Next (disabled)"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Progress */}
            <div className="mt-8">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-4
                         [&::-webkit-slider-thumb]:h-4
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-white
                         [&::-webkit-slider-thumb]:cursor-pointer
                         hover:[&::-webkit-slider-thumb]:scale-110
                         [&::-webkit-slider-thumb]:transition-transform"
                aria-label="Seek"
              />
              <div className="flex justify-between text-sm text-white/60 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Extra details / actions row (fills PC space nicely, still clean on mobile) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Volume */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white/80">Volume</span>
                  <span className="text-sm text-white/60">{Math.round(volume * 100)}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-4
                             [&::-webkit-slider-thumb]:h-4
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-spotify-green
                             [&::-webkit-slider-thumb]:cursor-pointer"
                    aria-label="Volume"
                  />
                </div>
              </div>

              {/* Track meta (looks good on large screens) */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-semibold text-white/80 mb-2">Now Playing</p>
                <div className="space-y-1 text-sm text-white/60">
                  <p className="truncate"><span className="text-white/80 font-medium">Album:</span> {track.album}</p>
                  <p><span className="text-white/80 font-medium">Year:</span> {track.year}</p>
                  <p className="truncate"><span className="text-white/80 font-medium">Genre:</span> {track.genre}</p>
                </div>
              </div>
            </div>

            {/* Hidden Audio */}
            <audio ref={audioRef} src={track.audioUrl} preload="metadata" />
          </section>
        </div>
      </main>
    </div>
  );
}