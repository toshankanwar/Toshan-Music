import './globals.css'
import Footer from './components/Footer'
export const metadata = {
  title: 'Toshan Music - Your Music Library',
  description: 'Stream your favorite music',
  manifest: '/mainfest.json',
  themeColor: '#1DB954',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Toshan Music',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: '/icon-192x192.png',
  },
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    )
}
