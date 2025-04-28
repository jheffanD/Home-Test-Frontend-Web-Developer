"use client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Userbutton from "@/components/userbutton";
import { usePathname } from "next/navigation";
import { Getalluser } from "@/app/API/Route";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");

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
  ];

  return (
    <main>
      {!excludedPaths.includes(pathname) && (
        <nav className="w-full h-14 md:h-16 fixed top-0 left-0 right-0 flex items-center justify-between bg-transparent  px-4 md:px-10 py-2 z-50">
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

          {/* User Info */}
          <div className="flex items-center space-x-2">
            <div className="bg-gray-400 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-medium text-sm md:text-base">
              <Avatar>
                <AvatarFallback>{firstLetter}</AvatarFallback>
              </Avatar>
            </div>
            <div className="hidden sm:flex">
              <Userbutton warna={textColor} />
            </div>
          </div>
        </nav>
      )}
    </main>
  );
}
