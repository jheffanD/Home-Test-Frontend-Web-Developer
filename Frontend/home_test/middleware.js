// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Contoh sederhana
  return NextResponse.next();
}

// Konfigurasi matcher path di bawah ini:
export const config = {
  matcher: [
    '/articles/:path*', // Middleware aktif hanya di path /articles/*
    // kalau mau semua path, cukup pakai '/:path*'
  ],
};
