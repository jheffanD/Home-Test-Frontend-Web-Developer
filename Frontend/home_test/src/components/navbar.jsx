"use client";
import Image from "next/image";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isWhiteLogo =
    pathname.startsWith("/user") ||
    pathname.startsWith("/articles") ||
    pathname.startsWith("/user/list_artikel");

  const logoSrc = isWhiteLogo ? "/img/Frame.png" : "/img/Logo.png";

  const textColor = isWhiteLogo ? "text-black" : "text-white";

  return (
    <nav className="w-full h-14 bg-transparent fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-2 z-50">
      <div className="flex items-center ml-10">
        <Image src={logoSrc} alt="Logo" width={100} height={100} />
      </div>

      <div className="flex items-center space-x-2 text-white mr-10">
        <p className="bg-gray-400 w-7 aspect-square rounded-full flex items-center justify-center font-medium">
          J
        </p>
        <p
          className={`underline ${textColor} font-light underline-offset-auto`}
        >
          James Dean
        </p>
      </div>
    </nav>
  );
}
