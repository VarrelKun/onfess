import { SharePostButton } from "@/components/share-button";
import { ThreadDetailAction } from "@/components/thread-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChatBubbleIcon, Share2Icon } from "@radix-ui/react-icons";
import { MoreHorizontalIcon, SortDesc } from "lucide-react";
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
    <div className="mb-20 mt-4">
      <div className="">
        <Post thread={thread} />
        <div className="mt-6">
          <h5 className="px-4 font-medium">Tanggapan</h5>
          <CommentForm thread_slug={props.params.thread} />
          <Suspense
            fallback={
              <div className="mt-6 p-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full mt-4" />
                <Skeleton className="h-16 w-full mt-4" />
              </div>
            }
          >
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
    <div className="mt-4">
      {/* {comments.length > 0 && <p className="font-semibold m-4">Tanggapan:</p>} */}

      <div className="last:border-b">
        <p className="mx-4 text-sm my-2 text-primary font-medium">
          <SortDesc className="w-4 h-4 inline" /> Terbaru ke terlama
        </p>
        {comments.length === 0 && (
          <p className="my-6  text-center text-muted-foreground text-sm">
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
      <div className="w-full p-4 border-b">
        <div className="mt-1 w-full rounded-lg  px-3 py-2 transition duration-100 hover:bg-slate-50">
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <div>
                  <span className="">{"Anonim"}</span>
                  <span className="">
                    <svg
                      className="w-0.5 h-0.5 bg-muted-foreground rounded-full inline mx-1"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="100" height="100" rx="50" />
                    </svg>
                  </span>
                  <span className="text-muted-foreground">
                    {moment(thread!.created_at).locale("id").fromNow()}
                  </span>
                </div>
                <div className="">
                  <ThreadDetailAction
                    thread_slug={thread!.slug}
                    group_slug={thread!.group.slug}
                  >
                    <button className="text-muted-foreground hover:text-primary">
                      <MoreHorizontalIcon className="" />
                    </button>
                  </ThreadDetailAction>
                </div>
              </div>
            </div>
          </div>
          <div className="py-1">
            <p className="text-sm whitespace-pre-line">{thread!.content}</p>
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
              <SharePostButton
                thread={{
                  slug: thread!.slug,
                  content: thread!.content,
                  sender: thread!.sender,
                  created_at: thread!.created_at,
                  comment_count: thread!._count.comments,
                  share_count: thread!._count.shares,
                }}
                group={thread!.group}
              >
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="h-8 rounded-full font-normal"
                >
                  <Share2Icon className="mx-2 h-4 w-4" />
                  {/* <span className="text-sm"> {thread!._count.shares}</span> */}
                </Button>
              </SharePostButton>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Comment({
  comment,
  group,
}: {
  comment: Awaited<ReturnType<typeof getThreadsCommentsBySlug>>[number];
  group: { slug: string };
}) {
  return (
    <div className="w-full border-t">
      <div className="w-full rounded-lg px-4 pt-4 pb-2 transition duration-100 hover:bg-slate-50">
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex flex-col">
            <div>
              <span className="inline-flex w-fit items-center">{"Anonim"}</span>
              <span className="">
                <svg
                  className="w-0.5 h-0.5 bg-muted-foreground rounded-full inline mx-1"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" rx="50" />
                </svg>
              </span>
              <span className="text-muted-foreground">
                {moment(comment.created_at).locale("id").fromNow()}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-1 py-0.5">
          <p className="text-sm">
            <Link
              href={`/${group.slug}/${comment.slug}`}
              className="inline-block whitespace-pre-line"
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
        <div className="mt-2 flex gap-x-2 text-neutral-500">
          <div className="flex items-center justify-center rounded-full">
            <Link
              href={`/${group.slug}/${comment.slug}`}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "h-8 rounded-full font-normal",
              )}
            >
              <ChatBubbleIcon className="mr-2 h-4 w-4" />
              <span className="text-sm">{comment._count.comments}</span>
            </Link>
          </div>
          <div className="flex items-center justify-center rounded-full">
            <SharePostButton
              thread={{
                slug: comment!.slug,
                content: comment!.content,
                sender: comment!.sender,
                created_at: comment!.created_at,
                comment_count: comment!._count.comments,
                share_count: comment!._count.shares,
              }}
              group={comment!.group}
            >
              <Button
                variant={"ghost"}
                size={"sm"}
                className="h-8 rounded-full font-normal"
              >
                <Share2Icon className="mx-2 h-4 w-4" />
                {/* <span className="text-sm">{comment._count.shares}</span> */}
              </Button>
            </SharePostButton>
          </div>
        </div>
      </div>
      {/* <SubComment />
      <SubComment /> */}
      <Suspense>
        <Subcomments thread_slug={comment.slug} group={group} />
      </Suspense>
    </div>
  );
}

async function Subcomments(props: {
  thread_slug: string;
  group: { slug: string };
}) {
  const subcomments = await getThreadsCommentsBySlug(props.thread_slug, 3);
  if (subcomments.length === 0) return null;
  return (
    <div className="last:mb-2">
      {subcomments.length > 2 && (
        <div className="mt-2">
          <Link
            href={`/${props.group.slug}/${props.thread_slug}`}
            className="hover:underline text-primary text-xs font-medium ml-4"
          >
            Lihat tanggapan sebelumnya...
          </Link>
        </div>
      )}
      {subcomments
        .reverse()
        .slice(0, 2)
        .map((subcomment) => {
          return <SubComment key={subcomment.id} comment={subcomment} />;
        })}
    </div>
  );
}

function SubComment(props: {
  comment: Awaited<ReturnType<typeof getThreadsCommentsBySlug>>[number];
}) {
  return (
    <div className="ml-8">
      <div className="border-l">
        <div className="w-full">
          <div className=" w-full px-3 py-2 transition duration-100 hover:bg-slate-50">
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex flex-col">
                <div>
                  <span className="inline-flex w-fit items-center">
                    {"Anonim"}
                  </span>
                  <span className="">
                    <svg
                      className="w-0.5 h-0.5 bg-muted-foreground rounded-full inline mx-1"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="100" height="100" rx="50" />
                    </svg>
                  </span>
                  <span className="text-muted-foreground">
                    {moment(props.comment.created_at).locale("id").fromNow()}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm">{props.comment.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
