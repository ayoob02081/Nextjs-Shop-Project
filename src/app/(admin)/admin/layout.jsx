import "../../../styles/globals.css";
import vazirFont from "@/constants/localFonts";
import Header from "@/pages/Header";
import Providers from "@/pages/Providers";
import { Toaster } from "react-hot-toast";
import AdminSideBar from "./_components/AdminSideBar";
import HamburgerMenu from "@/components/HambergerMenu";

export default function AdminLayout({ children }) {
  return (
    <html lang="en" dir="rtl" className="light-mode">
      <body
        className={`${vazirFont.variable} font-sans antialiased bg-gray-100`}
      >
        <Providers>
          <Toaster />
          <HamburgerMenu>
            <AdminSideBar />
          </HamburgerMenu>
          <div className="flex flex-col sm:grid sm:grid-cols-3 h-screen mt-10">
            <div className="hidden sm:block bg-gray-100 overflow-y-auto p-4">
              <AdminSideBar />
            </div>
            <div className="col-span-3 sm:col-span-2 overflow-y-auto p-4 bg-secondary-0 shadow-md rounded-xl h-screen overflow-hidden">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
