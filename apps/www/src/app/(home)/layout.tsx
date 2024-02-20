import { CreateNewGroupModal } from "@/components/group-modal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { PropsWithChildren } from "react";

export default function Layout<P>({ children }: PropsWithChildren<P>) {
  return (
    <div className="">
      <div className="mx-auto md:max-w-screen-sm md:min-w-max border min-h-screen bg-background">
        <header className="p-4 border-b md:max-w-screen-sm">
          <div className="grid grid-cols-2">
            <div className="">
              <h2 className="font-bold text-2xl text-primary">
                OnFess | Online Menfess
              </h2>
              <p className="text-sm text-muted-foreground">
                Tulis menfess secara anonim untuk orang disekitarmu ✨
              </p>
            </div>
            <div className="flex justify-end">
              {" "}
              <CreateNewGroupModal>
                <Button size={"sm"} className="rounded-full mt-2">
                  <PlusIcon className="w-6 h-6 mr-3 " /> Grup Baru
                </Button>
              </CreateNewGroupModal>
            </div>
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
