import { cn } from "@/lib/utils";
import { AtomIcon, FlameIcon } from "lucide-react";
import "moment/locale/id";
import {
  getLastestThreadsByGroupSlug,
  getPopularThreadsByGroupSlug,
} from "../[thread]/thread.actions";
import CreateNewThreadForm from "../components/create-new-thread-form";
import { ThreadItem } from "../components/thread-item";

type Props = {
  params: {
    group: string;
  };
};

export default async function GroupPage(props: Props) {
  const [lastestThreads, popular] = await Promise.all([
    getLastestThreadsByGroupSlug(props.params.group, 30),
    getPopularThreadsByGroupSlug(props.params.group),
  ]);
  return (
    <div className="">
      <div className="mt-4 border-b p-4 ">
        <CreateNewThreadForm group_slug={props.params.group} />
      </div>
      <div className="m-4">
        {!!popular.length && (
          <div>
            <div className="flex gap-x-1 items-center my-2 mt-6">
              <FlameIcon className="" />
              <span className="font-semibold ">Populer</span>
            </div>
            <div className="space-y-4">
              {popular.map((thread, index) => {
                return (
                  <ThreadItem
                    key={thread.id}
                    thread={{
                      ...thread,
                      comment_count: thread._count.comments,
                      share_count: thread._count.shares,
                    }}
                    group={{ slug: props.params.group }}
                    className={cn(index % 2 == 1 && "bg-gray-50")}
                  />
                );
              })}
            </div>
          </div>
        )}

        {!!lastestThreads.length && (
          <div>
            <div className="flex gap-x-1 items-center my-2 mt-6">
              <AtomIcon className="" />
              <span className="font-semibold ">Terbaru</span>
            </div>
            <div className="space-y-4">
              {lastestThreads.map((thread, index) => {
                return (
                  <ThreadItem
                    key={thread.id}
                    thread={{
                      ...thread,
                      comment_count: thread._count.comments,
                      share_count: thread._count.shares,
                    }}
                    group={{ slug: props.params.group }}
                    className={cn(index % 2 == 1 && "bg-gray-50")}
                  />
                );
              })}
            </div>
          </div>
        )}

        {!popular.length && !lastestThreads.length && (
          <div className="text-center text-muted-foreground mt-6">
            Belum ada menfess di grup ini.
          </div>
        )}
      </div>
    </div>
  );
}
