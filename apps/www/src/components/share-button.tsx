"use client";
import "moment/locale/id";

import { CopyIcon } from "lucide-react";
import moment from "moment";
import { PropsWithChildren } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = PropsWithChildren<{}> & {
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

export function SharePostButton(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bagikan</DialogTitle>
          <DialogDescription>
            Ajak orang lain untuk menanggapi pesan ini.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex flex-col">
                <div>
                  <span className="">{props.thread.sender ?? "Anonim"}</span>
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
                    {moment(props.thread.created_at)
                      .locale("id")
                      .format("DD MMMM YYYY")}
                  </span>
                  {props.group.name && (
                    <>
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
                        {props.group.name}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-slate-700">
                {props.thread.content.slice(0, 300)}
                {props.thread.content.length > 300 && (
                  <span className="text-violet-500 block">
                    {" "}
                    Lihat selengkapnya...
                  </span>
                )}
              </p>
            </div>
            <div className="mt-1">
              <p className="text-muted-foreground text-xs opacity-60">
                di posting pada OnFess.
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <button
              onClick={async () => {
                try {
                  if (!window.isSecureContext) {
                    return;
                  }
                  await window.navigator.clipboard.writeText(
                    `${window.location.origin}/${props.group.slug}/${props.thread.slug}`,
                  );
                  toast.success("Link disalin ke clipboard.");
                } catch (error) {}
              }}
              className="flex gap-2 justify-center items-center text-sm text-muted-foreground hover:text-primary font-medium"
            >
              <CopyIcon className="w-4 h-4" />
              Salin Link
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
