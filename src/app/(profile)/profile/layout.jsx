import "../../../styles/globals.css";
import vazirFont from "@/constants/localFonts";
import Providers from "@/pages/Providers";
import { Toaster } from "react-hot-toast";
import SideBar from "./_components/SideBar";
import HamburgerMenu from "@/components/HambergerMenu";

export default function ProfileLayout({ children }) {
  return (
    <html lang="en" dir="rtl" className="light-mode">
      <body
        className={`${vazirFont.variable} font-sans antialiased bg-gray-100`}
      >
        <Providers>
          <Toaster />
          <HamburgerMenu>
            <SideBar />
          </HamburgerMenu>
          <div className="flex flex-col sm:grid sm:grid-cols-3 h-screen mt-10">
            <div className="hidden sm:block bg-gray-100 overflow-y-auto p-4">
              <SideBar />
            </div>
            <div className=" sm:col-span-2 overflow-y-auto h-screen p-4 bg-secondary-0 shadow-md rounded-xl overflow-hidden">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
