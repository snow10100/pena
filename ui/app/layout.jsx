import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BreachSeek",
  description: "AI powered pentesting Agent ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + " bg-light-background dark:bg-dark-background"
        }
      >
        {children}
      </body>
    </html>
  );
}
