import vazirFont from "@/constants/localFonts";
import "../../styles/globals.css";
import Header from "../Header";
import { Toaster } from "react-hot-toast";
import Providers from "../Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl" className="light-mode">
      <body className={`${vazirFont.variable} font-sans antialiased`}>
        <Providers>
          <Toaster />
          <Header className="mb-10" />
          <div className="container xl:max-w-screen-xl">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
