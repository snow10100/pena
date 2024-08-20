import { ThemeProvider } from '../hooks/ThemeContext'; // Adjust the path if necessary
import "../styles/globals.css";


export const metadata = {
  title: "BreachSeek",
  description: "AI powered pentesting Agent ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          "text-[#004aad] dark:text-whtie bg-[#FFF] dark:bg-dark-background"
        }
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
