'use client'

import { useEffect, useState } from 'react';

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // If app is already installed (standalone), don't show install button
    const standalone =
      window.matchMedia?.('(display-mode: standalone)')?.matches ||
      window.navigator?.standalone === true; // iOS fallback

    if (standalone) setIsInstalled(true);

    const handler = (e) => {
      // Chrome/Edge fires this event when PWA is installable
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  if (isInstalled) return null;
  if (!deferredPrompt) return null; // not installable yet

  const onInstallClick = async () => {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <button
      onClick={onInstallClick}
      className="px-5 py-2.5 rounded-full bg-spotify-green text-black font-bold hover:scale-105 transition-transform"
    >
      Install App
    </button>
  );
}