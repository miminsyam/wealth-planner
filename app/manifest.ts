import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StockCheck Outlet',
    short_name: 'StockCheck',
    description: 'Scan QR atau tekan butang untuk akses folder outlet StockCheck.',
    start_url: '/',
    display: 'standalone',
    background_color: '#B08968',
    theme_color: '#96714F',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-512.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
