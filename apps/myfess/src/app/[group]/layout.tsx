import { Metadata } from "next";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { getGroupBySlug } from "./group.actions";

type Props = {
  params: {
    group: string;
  };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const group = await getGroupBySlug(props.params.group);
  return {
    title: group ? `${group?.name} Menfess` : "Grup Tidak Ditemukan",
  };
};

export default async function Layout<P>({
  children,
  params,
}: PropsWithChildren<P> & Props) {
  const group = await getGroupBySlug(params.group);
  return (
    <div className="">
      <div className="mx-auto md:max-w-screen-sm md:min-w-max border min-h-screen bg-background">
        <header className="px-5 py-2 bg-primary rounded-full shadow-md text-center m-2 mt-4">
          <Link href={"/"}>
            <p className="text-xs font-medium text-slate-100">MyFess</p>
          </Link>
          <Link href={`/${group?.slug || ""}`}>
            <h2 className="text-xl font-bold tracking-tight text-slate-50">
              {group?.name ?? "Grup Tidak Ditemukan"}
            </h2>
          </Link>
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
