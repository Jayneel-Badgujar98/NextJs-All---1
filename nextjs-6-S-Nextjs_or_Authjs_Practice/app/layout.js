// app/layout.js
import './globals.css';
import SessionProviderWrapper from '../lib/SessionProviderWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
