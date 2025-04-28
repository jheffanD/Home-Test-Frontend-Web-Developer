"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Navbaradmin() {
  const [activeMenu, setActiveMenu] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  // Mengatur menu yang aktif ke "articles" saat pertama kali halaman dimuat
  useEffect(() => {
    handleMenuClick("");
  }, []); // Menjalankan sekali pada saat komponen pertama kali dimuat

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className={`pl-[267px] ${!isSidebarOpen ? "pl-0" : ""}`}>
      {/* Sidebar */}
      <nav
        className={`w-[267px] h-screen bg-blue-600 fixed flex flex-col top-0 left-0 items-start justify-start px-4 py-2 z-50 transition-all ${
          isSidebarOpen ? "" : "hidden"
        } sm:block`}
      >
        <div className="flex items-center justify-center w-full mt-5 mb-5">
          <Image src="/img/Logo.png" alt="Logo" width={134} height={24} />
        </div>
        <div className="flex flex-col items-start w-full p-4 gap-4 text-white">
          {/* Articles */}
          <div
            className={`flex items-center w-full p-2 rounded-md cursor-pointer ${
              activeMenu === "articles" ? "bg-blue-500" : "hover:bg-blue-500"
            }`}
            onClick={() => handleMenuClick("articles")}
          >
            <Image
              src="/img/artikel.png"
              alt="artikel"
              width={20}
              height={20}
              className="mr-2"
            />
            <Link href="/admin/artikel/crud">Articles</Link>
          </div>

          {/* Category */}
          <div
            className={`flex items-center w-full p-2 rounded-md cursor-pointer ${
              activeMenu === "category" ? "bg-blue-500" : "hover:bg-blue-500"
            }`}
            onClick={() => handleMenuClick("category")}
          >
            <Image
              src="/img/kategori.png"
              alt="kategori"
              width={20}
              height={20}
              className="mr-2"
            />
            <Link href="/admin/artikel/kategori">Category</Link>
          </div>

          {/* Logout */}
          <div
            className={`flex items-center w-full p-2 rounded-md cursor-pointer ${
              activeMenu === "logout" ? "bg-blue-500" : "hover:bg-blue-500"
            }`}
            onClick={() => handleMenuClick("logout")}
          >
            <Image
              src="/img/out.png"
              alt="out"
              width={20}
              height={20}
              className="mr-2"
            />
            <Logout />
          </div>
        </div>
      </nav>

      {/* Button to toggle the sidebar on mobile */}
      <button
        className="sm:hidden p-2 absolute top-5 left-5 z-50 text-black"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </main>
  );
}

function Logout() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Log Out</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure want to LOGOUT?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-blue-600">
            <Link href="/Login">Logout</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
