"use client";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  group_slug: string;
  children?: ReactNode;
};

export default function ThreadHeader(props: Props) {
  const router = useRouter();
  return (
    <header className="border-b md:max-w-screen-sm flex items-center">
      <button onClick={() => router.back()} className="p-4 mr-1">
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      {props.children}
    </header>
  );
}
