import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./components/common/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BreachSeek",
  description: "AI powered pentesting Agent ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + "bg-light-background dark:bg-dark-background"}>
        <div className="p-4 sm:ml-[20rem]">
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  );
}
