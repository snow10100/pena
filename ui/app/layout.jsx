'use client'
import { ThemeProvider } from '../hooks/ThemeContext'; // Adjust the path if necessary
import { ModelProvider } from '../hooks/ModelContext'; // Adjust the import path as necessary
import "../styles/globals.css";

// export const metadata = {
//   title: "BreachSeek",
//   description: "AI powered pentesting Agent",
//   icons: {
//     icon: [
//       { url: '/icon.svg', sizes: '32x32', type: 'image/svg+xml' },
//       { url: '/icon.svg', sizes: '64x64', type: 'image/svg+xml' },
//       { url: '/icon.svg', sizes: '128x128', type: 'image/svg+xml' },
//       { url: '/icon.svg', sizes: '256x256', type: 'image/svg+xml' }
//     ],
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          "text-[#004aad] dark:text-white bg-[#FFF] dark:bg-dark-background"
        }
      >
        <ThemeProvider>
          <ModelProvider>
            {children}
          </ModelProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}