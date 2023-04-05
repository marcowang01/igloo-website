import '../styles/globals.css'
import '../styles/infinite.css'
import '../styles/cursor-chat.css'
import { useEffect, useState } from 'react'

import localFont from '@next/font/local'
export const sfProDisplay = localFont({
  src: [
    // { path: '../styles/fonts/SF-Pro-Display-Thin.otf', weight: '100', style: 'normal' },
    // { path: '../styles/fonts/SF-Pro-Display-Ultralight.otf', weight: '200', style: 'normal' },
    { path: '../styles/fonts/SF-Pro-Display-Light.otf', weight: '300',  style: 'normal' },
    { path: '../styles/fonts/SF-Pro-Display-Regular.otf', weight: '400',  style: 'normal' },
    { path: '../styles/fonts/SF-Pro-Display-Medium.otf', weight: '500',  style: 'normal' },
    { path: '../styles/fonts/SF-Pro-Display-Semibold.otf', weight: '600',  style: 'normal' },
    { path: '../styles/fonts/SF-Pro-Display-Bold.otf', weight: '700',  style: 'normal' },
    // { path: '../styles/fonts/SF-Pro-Display-Heavy.otf', weight: '900',  style: 'normal' },
    // { path: '../styles/fonts/SF-Pro-Display-Black.otf', weight: '1000',  style: 'normal' },
    // { path: '../styles/fonts/SF-Pro-Display-UltralightItalic.otf', weight: '200', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Display-LightItalic.otf', weight: '300', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Display-RegularItalic.otf', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Display-MediumItalic.otf', weight: '500', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Display-SemiboldItalic.otf', weight: '600', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Display-BoldItalic.otf', weight: '700', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Display-HeavyItalic.otf', weight: '900', style: 'italic' },
  ],
  variable:'--font-sf-pro-display',
})

export const sfProText = localFont({
  src: [
    // { path: '../styles/fonts/SF-Pro-Text-Thin.otf', weight: '100',  style: 'normal' },
    { path: '../styles/fonts/SF-Pro-Text-Ultralight.otf', weight: '200',  style: 'normal' },
    { path: '../styles/fonts/SF-Pro-Text-Light.otf', weight: '300',  style: 'normal' },
    { path: '../styles/fonts/SF-Pro-Text-Regular.otf', weight: '400',  style: 'normal' },
    // { path: '../styles/fonts/SF-Pro-Text-Medium.otf', weight: '500',  style: 'normal' },
    { path: '../styles/fonts/SF-Pro-Text-Bold.otf', weight: '700',  style: 'normal' },
    // { path: '../styles/fonts/SF-Pro-Text-Heavy.otf', weight: '900',  style: 'normal' },
    // { path: '../styles/fonts/SF-Pro-Text-Black.otf', weight: '1000',  style: 'normal' },
    // { path: '../styles/fonts/SF-Pro-Text-UltralightItalic.otf', weight: '200', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Text-LightItalic.otf', weight: '300', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Text-RegularItalic.otf', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Text-MediumItalic.otf', weight: '500', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Text-BoldItalic.otf', weight: '700', style: 'italic' },
    // { path: '../styles/fonts/SF-Pro-Text-HeavyItalic.otf', weight: '900', style: 'italic' },
  ],
  variable:'--font-sf-pro-text',
})


import type { AppPropsWithLayout } from '../types/layoutTypes'
import Layout from '../components/layouts/layout';


export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout> {page} </Layout>)

  return (
    // <main className={sfProDisplay.className}>
    <>
    {getLayout(<Component {...pageProps} />)}
    <div className={`loading-screen${loading ? '' : ' hidden'}`}>
      <div className={sfProDisplay.className}>
        <div className='animate'>
          <div className='animate-text'>
            IGLOO
          </div>
        </div>
      </div>
    </div>
    </>
    // </main>
  )
}
