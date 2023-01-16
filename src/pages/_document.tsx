import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://kit.fontawesome.com/bfd3987de4.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
