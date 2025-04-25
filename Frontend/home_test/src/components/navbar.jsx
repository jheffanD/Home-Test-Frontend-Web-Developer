import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full h-14 bg-transparent fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-2 z-50">
      {/* Logo kiri */}
      <div className="flex items-center ml-10">
        <Image src="/img/Logo.png" alt="Logo" width={100} height={100} />
      </div>

      {/* Tombol user kanan */}
      <div className="flex items-center space-x-2 text-white mr-10">
        <p className="bg-gray-400 w-7 aspect-square rounded-full flex items-center justify-center font-medium">
          J
        </p>
        <p className="underline font-light underline-offset-auto">James Dean</p>
      </div>
    </nav>
  );
}
