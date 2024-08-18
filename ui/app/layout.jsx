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
          " bg-light-background dark:bg-dark-background"
        }
      >
        {children}
      </body>
    </html>
  );
}
