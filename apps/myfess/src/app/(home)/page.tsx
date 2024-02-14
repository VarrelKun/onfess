import { AtomIcon, FlameIcon, UsersRoundIcon } from "lucide-react";
import "moment/locale/id";
import Link from "next/link";
import {
  getLastestThreads,
  getPopularThreads,
} from "../[group]/[thread]/thread.actions";
import { ThreadItem } from "../[group]/components/thread-item";
import { getPopularGroup } from "../[group]/group.actions";

export const revalidate = 200;

export default async function HomePage() {
  const [popular, lastest, popularGroup] = await Promise.all([
    getPopularThreads(),
    getLastestThreads(),
    getPopularGroup(),
  ]);
  return (
    <div>
      <div className="m-4">
        <div className="flex gap-x-1 items-center my-2 mt-6">
          <FlameIcon className="" />
          <span className="font-semibold ">Menfess Populer</span>
        </div>
        <div className="space-y-3">
          {popular.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={{
                ...thread,
                comment_count: thread._count.comments,
                share_count: thread._count.shares,
              }}
              group={thread.group}
            />
          ))}
        </div>
        <div className="flex gap-x-1 items-center my-2 mt-6">
          <AtomIcon className="" />
          <span className="font-semibold ">Menfess Terbaru</span>
        </div>
        <div className="space-y-3">
          {lastest.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={{
                ...thread,
                comment_count: thread._count.comments,
                share_count: thread._count.shares,
              }}
              group={thread.group}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="m-4">
          <div className="flex gap-x-1 items-center mt-6">
            <UsersRoundIcon />
            <span className="font-semibold">Komunitas Populer</span>
          </div>
          <div className="mt-2">
            <ol className="list-decimal list-inside space-y-1 text-primary font-medium text-sm">
              {popularGroup.map((group) => (
                <li key={group.id}>
                  <Link href={`/${group.slug}`} className="hover:underline">
                    {group.name}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
