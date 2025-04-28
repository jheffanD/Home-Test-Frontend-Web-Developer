"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import Link from "next/link";

export default function adminbutton() {
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className={`underline font-light cursor-pointer text-slate-900`}>
          Jeffan
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-44 mt-2 mr-10 overflow-hidden">
        <DropdownMenuItem>
          <Link href="/admin/artikel/profile" className="w-full text-sm">
            My Account
          </Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger className="text-red-600 flex items-center ml-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 0H5a2 2 0 00-2 2v10a2 2 0 002 2h6"
              />
            </svg>
            Log out
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-blue-600">
                <Link href="/Login" className="text-white">
                  Log out
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
