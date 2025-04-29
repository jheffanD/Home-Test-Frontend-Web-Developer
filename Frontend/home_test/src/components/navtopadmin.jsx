"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Adminbutton from "./adminbutton";
import { usePathname } from "next/navigation";

export default function Navtop() {
  const [userName, setUserName] = useState("");
  const pathname = usePathname();

  let text = "";

  if (pathname.startsWith("/admin/artikel/crud")) {
    text = "Articles";
  } else if (pathname.startsWith("/admin/artikel/kategori")) {
    text = "Category";
  } else {
    text = "User Profile";
  }
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <nav className="w-full h-14 bg-white flex items-center justify-between px-6 shadow-md fixed top-0">
      <div className="flex items-center ml-[150px]">
        <span className="text-sm font-semibold">{text}</span>
      </div>

      <div className="flex items-center space-x-2 text-white mr-32">
        <div className="bg-gray-400 w-5 mr-5 rounded-full flex items-center justify-center font-medium">
          <Avatar>
            <AvatarFallback> {firstLetter}</AvatarFallback>
          </Avatar>
        </div>
        <Adminbutton />
      </div>
    </nav>
  );
}
