import { CreateNewGroupModal } from "@/components/group-modal";
import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";
import { PropsWithChildren } from "react";

export default function Layout<P>({ children }: PropsWithChildren<P>) {
  return (
    <div className="">
      <div className="mx-auto md:max-w-screen-sm md:min-w-max border min-h-screen bg-background">
        <header className="px-5 py-2 bg-primary rounded-full shadow-md text-center m-2 mt-4 flex items-center justify-between">
          <div></div>
          <h2 className="text-xl font-bold tracking-tight text-slate-50">
            MyFess
          </h2>
          <div>
            <CreateNewGroupModal>
              <Button
                className="hover:bg-transparent"
                variant={"ghost"}
                size={"icon"}
              >
                <PlusSquareIcon className="w-6 h-6 text-slate-100" />
              </Button>
            </CreateNewGroupModal>
          </div>
        </header>
        <main className="min-h-screen md:max-w-screen-sm">{children}</main>
        <footer className="border-t">
          <div className="p-4 text-center text-slate-600">
            <p className="text-xs">
              Crafted with{" "}
              <span role="img" aria-label="love" className="mx-1">
                🧡
              </span>{" "}
              by Indonesian Programmer 🇮🇩
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
