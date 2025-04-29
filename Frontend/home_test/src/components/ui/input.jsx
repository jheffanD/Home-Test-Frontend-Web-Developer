import * as React from "react"
import { cn } from "../../lib/utils"
import Image from "next/image" // Pastikan Image sudah diimpor

function Input({
  className,
  type,
  iconSrc, // Menambahkan prop untuk ikon
  iconAlt = "", // Menambahkan prop untuk teks alt ikon
  ...props
}) {
  return (
    <div className="relative w-full">
      {/* Menambahkan elemen gambar di dalam input */}
      {iconSrc && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Image src={iconSrc} alt={iconAlt} width={16} height={16} />
        </div>
      )}

      {/* Input field */}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          iconSrc ? "pl-10" : "", // Menambahkan padding kiri jika ada ikon
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
