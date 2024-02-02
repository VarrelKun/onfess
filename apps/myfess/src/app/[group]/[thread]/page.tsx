import { Button, buttonVariants } from "@/components/ui/button";
import { ChatBubbleIcon, Share2Icon } from "@radix-ui/react-icons";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CommentForm from "./components/comment-form";
import { getThreadBySlug, getThreadsCommentsBySlug } from "./thread.actions";

type Props = {
  params: {
    thread: string;
    group: string;
  };
};

export default async function Thread(props: Props) {
  const thread = await getThreadBySlug(props.params.thread);
  if (!thread) return notFound();
  return (
    <div className="mb-20 mt-10">
      <div className="">
        <Post thread={thread} />
        <div className="mt-6 m-4">
          <p className="font-semibold">Kirim tanggapan:</p>
          <CommentForm thread_slug={props.params.thread} />
          <Suspense>
            <Comments
              thread_slug={props.params.thread}
              group_slug={props.params.group}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function Comments(props: { thread_slug: string; group_slug: string }) {
  const comments = await getThreadsCommentsBySlug(props.thread_slug);
  return (
    <div>
      {comments.length > 0 && <p className="font-semibold mt-4">Tanggapan:</p>}
      {comments.length === 0 && (
        <p className="mt-6 text-center text-muted-foreground text-sm">
          Belum ada tanggapan.
        </p>
      )}
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            group={{ slug: props.group_slug }}
          />
        );
      })}
    </div>
  );
}

function Post({
  thread,
}: {
  thread: Awaited<ReturnType<typeof getThreadBySlug>>;
}) {
  return (
    <article>
      <div className="w-full p-4 border-t border-b">
        <div className="mt-1 w-full rounded-lg  px-3 py-2 transition duration-100 hover:bg-slate-50">
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex flex-col">
              <div>
                <span className="">{"Anonim"}</span>
                <span className="font-bold">﹒</span>
                <span className="text-muted-foreground">
                  {moment(thread!.created_at).locale("id").fromNow()}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm">{thread!.content}</p>
          </div>
          <div className="mt-4 flex gap-x-2 text-neutral-500">
            <div className="flex items-center justify-center rounded-full border">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="h-8 rounded-full font-normal"
              >
                <ChatBubbleIcon className="mr-2 h-4 w-4" />
                <span className="text-sm"> {thread!._count.comments}</span>
              </Button>
            </div>
            <div className="flex items-center justify-center rounded-full border">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="h-8 rounded-full font-normal"
              >
                <Share2Icon className="mr-2 h-4 w-4" />
                <span className="text-sm"> {thread!._count.shares}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Comment({
  comment,
  group: thread,
}: {
  comment: Awaited<ReturnType<typeof getThreadsCommentsBySlug>>[number];
  group: { slug: string };
}) {
  return (
    <div className="mb-6 mt-3 w-full border-t border-none dark:border-solid">
      <div className="mt-1 w-full rounded-lg px-3 py-2 transition duration-100 hover:bg-slate-50">
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex flex-col">
            <div>
              <span className="inline-flex w-fit items-center">
                {comment.sender ?? "Anonim"}
              </span>
              <span className="font-bold">﹒</span>
              <span className="text-muted-foreground">
                {" "}
                {moment(comment.created_at).locale("id").fromNow()}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-1">
          <p className="text-sm">
            <Link
              href={`/${thread.slug}/${comment.slug}`}
              className="inline-block "
            >
              {comment.content.slice(0, 300)}
              {comment.content.length > 300 && (
                <span className="text-violet-500 hover:underline">
                  {" "}
                  Selengkapnya...
                </span>
              )}
            </Link>
          </p>
        </div>
        <div className="mt-4 flex gap-x-2 text-neutral-500">
          <div className="flex items-center justify-center rounded-full">
            <Link
              href={`/${thread.slug}/${comment.slug}`}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "h-8 rounded-full font-normal",
              })}
            >
              <ChatBubbleIcon className="mr-2 h-4 w-4" />
              <span className="text-sm">{comment._count.comments}</span>
            </Link>
          </div>
          <div className="flex items-center justify-center rounded-full">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="h-8 rounded-full font-normal"
            >
              <Share2Icon className="mr-2 h-4 w-4" />
              <span className="text-sm">{comment._count.shares}</span>
            </Button>
          </div>
        </div>
      </div>
      {/* <SubComment />
      <SubComment /> */}
    </div>
  );
}

function SubComment() {
  return (
    <div className="pl-3">
      <div className="border-l pl-3">
        <div className="w-full">
          <div className="mt-1 w-full rounded-lg px-3 py-2 transition duration-100 hover:bg-slate-50">
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex flex-col">
                <div>
                  <span className="inline-flex w-fit items-center">
                    mimamch
                  </span>
                  <span className="font-bold">﹒</span>
                  <span className="text-muted-foreground">Baru saja</span>
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm">
                Terima kasih atas penjelasannya, sangat membantu sekali.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
