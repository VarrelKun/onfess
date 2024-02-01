import { PropsWithChildren } from "react";

export default function Layout<P>({ children }: PropsWithChildren<P>) {
  return (
    <div className="">
      <div className="mx-auto md:max-w-screen-sm md:min-w-max border min-h-screen bg-background">
        <header className="px-5 py-2 bg-black rounded-full shadow m-2 mt-4">
          <p className="text-xs font-medium text-slate-100">MyFess</p>
          <h2 className="text-xl font-bold tracking-tight text-slate-50">
            SMAN 2 Kotabumi
          </h2>
        </header>
        <main className="min-h-screen md:max-w-screen-sm">{children}</main>
        <footer className="border-t">
          <div className="p-4 text-center text-slate-600">
            <p className="text-xs">
              Crafted with{" "}
              <span role="img" aria-label="love">
                ❤️
              </span>{" "}
              by Indonesian Programmer 🇮🇩
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
