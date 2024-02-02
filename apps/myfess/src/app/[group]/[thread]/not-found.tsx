import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NoThreadPage() {
  return (
    <div className="my-20 flex flex-col justify-center items-center">
      <p className="text-center">Tidak Ditemukan</p>
      <Link href={"/"} className={cn(buttonVariants(), "mx-auto mt-4")}>
        Kembali ke beranda
      </Link>
    </div>
  );
}
