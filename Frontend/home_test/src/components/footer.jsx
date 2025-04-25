import Image from "next/image";
export default function Footer() {
    return (
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
    );
    }