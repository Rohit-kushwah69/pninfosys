import { Toaster } from 'react-hot-toast'
import './globals.css'
import Providers from './providers'
import LayoutWrapper from './LayoutWrapper'


export const metadata = {
  title: 'PNINFOSYS',
  description: 'Website by PNINFOSYS',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="flex flex-col min-h-screen">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
        <Toaster position='top-right' />
      </body>
    </html>
  )
}