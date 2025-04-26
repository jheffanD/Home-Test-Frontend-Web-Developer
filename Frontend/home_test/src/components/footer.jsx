"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();
  return (
    <main>
         {/* agar footer tidak muncul di page regis dan login */}
      {pathname !== "/app/Login" || pathname !== "/app/register" && (
        <footer className="flex justify-center items-center h-20 bg-blue-600 text-white">
          <Image
            src="/img/Logo.png"
            alt="Logo"
            width={105}
            height={100}
            className="mr-2"
          />
          <p className="font-light">© 2025 Blog genzet. All rights reserved.</p>
        </footer>
      )}
    </main>
  );
}
