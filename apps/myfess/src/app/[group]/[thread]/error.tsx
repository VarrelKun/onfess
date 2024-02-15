"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="pt-12 p-4 max-w-md mx-auto">
      <h2 className="text-center font-semibold text-destructive text-2xl">
        Upsss, Terjadi Kesalahan ‼️
      </h2>
      <p className="text-center text-muted-foreground text-sm">
        Maaf atas kendala yang anda alami, Kami akan segera memperbaiki masalah
        ini sesegera mungkin.
      </p>
      <div className="flex flex-wrap gap-2 justify-center items-center mt-4">
        <Button onClick={() => reset()} variant={"outline"}>
          Muat ulang
        </Button>
        <Button onClick={() => window.location.replace("/")}>
          Kembali ke halaman utama
        </Button>
      </div>
    </div>
  );
}
