import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatBubbleIcon, Share2Icon } from "@radix-ui/react-icons";
import moment from "moment";
import Link from "next/link";

type Props = {
  thread: {
    slug: string;
    content: string;
    created_at: Date;
    sender?: string | null;
    comment_count: number;
    share_count: number;
  };
  group: {
    slug: string;
    name?: string;
  };
};

export function ThreadItem(props: Props) {
  return (
    <article className="">
      <div className="w-full border-t border-none dark:border-solid">
        <div className="mt-1 w-full rounded-lg border px-3 py-2 transition duration-100 hover:bg-slate-50">
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex flex-col">
              <div>
                <span className="">{props.thread.sender ?? "Anonim"}</span>
                <span className="font-bold">﹒</span>
                <span className="text-muted-foreground">
                  {moment(props.thread.created_at).locale("id").fromNow()}
                </span>
                {props.group.name && (
                  <>
                    <span className="font-bold">﹒</span>
                    <span className="text-muted-foreground">
                      {props.group.name}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-2"></div>
          <div className="mt-0.5">
            <p className="text-sm text-slate-700">
              <Link
                href={`/${props.group.slug}/${props.thread.slug}`}
                className="inline-block "
              >
                {props.thread.content.slice(0, 300)}
                {props.thread.content.length > 300 && (
                  <span className="text-violet-500 hover:underline">
                    {" "}
                    Selengkapnya...
                  </span>
                )}
              </Link>
            </p>
          </div>
          <div className="mt-2 flex gap-x-2 text-neutral-500">
            <div className="flex items-center justify-center rounded-full border">
              <Link
                href={`/${props.group.slug}/${props.thread.slug}`}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  }),
                  "h-8 rounded-full font-normal",
                )}
              >
                <ChatBubbleIcon className="mr-2 h-4 w-4" />
                <span className="text-sm">{props.thread.comment_count}</span>
              </Link>
            </div>
            <div className="flex items-center justify-center rounded-full border">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="h-8 rounded-full font-normal"
              >
                <Share2Icon className="mr-2 h-4 w-4" />
                <span className="text-sm">{props.thread.share_count}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
