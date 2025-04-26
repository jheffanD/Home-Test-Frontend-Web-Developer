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

        // Misal datanya kayak { name: "Jeffan" }
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

  return (
    <main>
      {/* agar navbar tidak muncul di page regis dan login */}
      {pathname !== "/app/Login" || pathname !== "/app/register" && (  
        <nav className="w-full h-14 bg-transparent fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-2 z-50">
          <div className="flex items-center ml-10">
            <Link href="/">
              <Image src={logoSrc} alt="Logo" width={100} height={100} />
            </Link>
          </div>

          <div className="flex items-center space-x-2 text-white mr-10">
            <div className="bg-gray-400 w-5 mr-5 rounded-full flex items-center justify-center font-medium">
              <Avatar>
                <AvatarFallback> {firstLetter}</AvatarFallback>
              </Avatar>
            </div>
            <Userbutton warna={textColor} />
          </div>
        </nav>
      )}
    </main>
  );
}
