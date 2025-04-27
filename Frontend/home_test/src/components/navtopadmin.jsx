"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Userbutton from "@/components/userbutton";

export default function Navtop() {
  const [userName, setUserName] = useState("");

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";
  return (
    <nav className="w-full h-14 bg-white flex items-center justify-between px-6 shadow-md fixed top-0">
      <div className="flex items-center ml-[150px]">
        <span className="text-sm font-semibold">Articles</span>
      </div>

      <div className="flex items-center space-x-2 text-white mr-32">
        <div className="bg-gray-400 w-5 mr-5 rounded-full flex items-center justify-center font-medium">
          <Avatar>
            <AvatarFallback> {firstLetter}</AvatarFallback>
          </Avatar>
        </div>
        <Userbutton warna={"text-black"} />
      </div>
    </nav>
  );
}
