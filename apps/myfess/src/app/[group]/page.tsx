import { AtomIcon, FlameIcon } from "lucide-react";
import "moment/locale/id";
import { getLastestThreadsByGroupSlug } from "./[thread]/thread.actions";
import CreateNewThreadForm from "./components/create-new-thread-form";
import { ThreadItem } from "./components/thread-item";

type Props = {
  params: {
    group: string;
  };
};

export default async function GroupPage(props: Props) {
  const lastestThreads = await getLastestThreadsByGroupSlug(props.params.group);
  return (
    <div className="">
      <div className="mt-4 border-t border-b p-4 ">
        <CreateNewThreadForm group_slug={props.params.group} />
      </div>
      <div className="m-4">
        <div className="flex gap-x-1 items-center mt-6">
          <FlameIcon className="" />
          <span className="font-semibold ">Populer</span>
        </div>
        <div className="space-y-4">
          {lastestThreads.map((thread) => {
            return (
              <ThreadItem
                key={thread.id}
                thread={{
                  ...thread,
                  comment_count: thread._count.comments,
                  share_count: thread._count.shares,
                }}
                group={{ slug: props.params.group }}
              />
            );
          })}
        </div>

        <div className="flex gap-x-1 items-center m-2 mt-6">
          <AtomIcon className="" />
          <span className="font-semibold ">Terbaru</span>
        </div>
        <div className="space-y-4">
          {lastestThreads.map((thread) => {
            return (
              <ThreadItem
                key={thread.id}
                thread={{
                  ...thread,
                  comment_count: thread._count.comments,
                  share_count: thread._count.shares,
                }}
                group={{ slug: props.params.group }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
