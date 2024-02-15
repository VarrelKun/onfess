import { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";
import ThreadHeader from "./components/thread-header";
import ThreadHeaderName from "./components/thread-header-name";
import { getThreadBySlug } from "./thread.actions";

type Props = {
  params: {
    group: string;
    thread: string;
  };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  // const group = await getGroupBySlug(props.params.group);
  const thread = await getThreadBySlug(props.params.thread);
  return {
    title: !thread ? "Thread Tidak Ditemukan" : thread.content.slice(0, 50),
    openGraph: {
      title: !thread ? "Thread Tidak Ditemukan" : thread.content.slice(0, 50),
      type: "article",
    },
  };
};

export default async function Layout<P>({
  children,
  params,
}: PropsWithChildren<P> & Props) {
  return (
    <div className="">
      <div className="mx-auto md:max-w-screen-sm md:min-w-max border min-h-screen bg-background">
        <ThreadHeader group_slug={params.group}>
          <Suspense>
            <ThreadHeaderName group_slug={params.group} />
          </Suspense>
        </ThreadHeader>
        <main className="min-h-screen md:max-w-screen-sm pt-8">{children}</main>
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
