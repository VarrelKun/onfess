import { Metadata } from "next";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { getGroupBySlug } from "../group.actions";

type Props = {
  params: {
    group: string;
  };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const group = await getGroupBySlug(props.params.group);
  return {
    title: group ? `${group?.name} Menfess` : "Grup Tidak Ditemukan",
    description: "Tulis dan temukan pesan anonim untuk orang di sekitar-mu ✨",
    openGraph: {
      title: group ? `${group?.name} Menfess` : "Grup Tidak Ditemukan",
      type: "article",
      images: ["/assets/images/og.png"],
    },
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
        <header className="p-4 border-b md:max-w-screen-sm">
          <div className="">
            <div className="">
              <h2 className="font-bold text-2xl text-primary">
                {" "}
                <Link href={`/${group?.slug || ""}`}>
                  {group?.name ?? "Grup Tidak Ditemukan"}
                </Link>{" "}
                | <Link href={`/`}> OnFess </Link>
              </h2>
              <p className="text-sm text-muted-foreground">
                Tulis dan temukan pesan anonim untuk orang di sekitar-mu ✨
              </p>
            </div>
          </div>
        </header>
        <main className="min-h-screen md:max-w-screen-sm">{children}</main>
        <footer className="border">
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
