"use client";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Userbutton from "@/components/userbutton";
import { usePathname } from "next/navigation";
import { Getalluser } from "@/app/API/Route";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Getalluser();
        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  const isWhiteLogo =
    pathname.startsWith("/user") ||
    pathname.startsWith("/articles") ||
    pathname.startsWith("/user/list_artikel");

  const logoSrc = isWhiteLogo ? "/img/Frame.png" : "/img/Logo.png";
  const textColor = isWhiteLogo ? "text-black" : "text-white";

  const excludedPaths = [
    "/app/Login",
    "/app/register",
    "/admin/artikel/crud",
    "/admin/artikel/up",
    "/admin/artikel/edit/[id]",
    "/admin/artikel/kategori",
    "/admin/artikel/profile",
    "/Login",
    "/register",
  ];

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false); // Close the mobile menu when an item is clicked
  };
  return (
    <main>
      {!excludedPaths.includes(pathname) && (
        <nav className="w-full h-14 md:h-16 fixed top-0 left-0 right-0 flex items-center justify-between bg-transparent px-4 md:px-10 py-2 z-50">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={logoSrc}
                alt="Logo"
                width={80}
                height={80}
                className="w-24 md:w-28 lg:w-32" // Responsive logo
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className="bg-gray-400 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-medium text-sm md:text-base">
              <Avatar>
                <AvatarFallback>{firstLetter}</AvatarFallback>
              </Avatar>
            </div>
            <Userbutton warna={textColor} />
          </div>
        </nav>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gradient-to-b from-gray-800 to-gray-600 shadow-lg absolute top-14 left-0 right-0 z-40 rounded-lg">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link
              href="/user/profile"
              onClick={handleMenuItemClick} 
              className="py-3 px-8 text-white hover:bg-gray-700 w-full text-center rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              My Account
            </Link>
            <Link
              href="/Login"
              onClick={handleMenuItemClick} 
              className="py-3 px-8 text-white hover:bg-gray-700 w-full text-center rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Log-out
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
