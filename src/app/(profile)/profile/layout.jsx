import "../../../styles/globals.css";
import vazirFont from "@/constants/localFonts";
import Providers from "@/pages/Providers";
import { Toaster } from "react-hot-toast";
import SideBar from "./_components/SideBar";
import Header from "@/pages/Header";

export default function ProfileLayout({ children }) {
  
  return (
    <html lang="en" dir="rtl" className="light-mode">
      <body
        className={`${vazirFont.variable} font-sans antialiased bg-gray-100`}
      >
        <Providers>
          <Toaster />
          <Header />
          {/* <Link href={mov}>ddd</Link> */}
          <div className="grid grid-cols-4 h-screen mt-10">
            <div className="col-span-1 bg-gray-100 overflow-y-auto p-4">
              <SideBar />
            </div>
            <div className="col-span-3 overflow-y-auto p-4 bg-secondary-0 shadow-md rounded-xl overflow-hidden">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
