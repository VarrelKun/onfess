import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatBubbleIcon, Share2Icon } from "@radix-ui/react-icons";
import { AtomIcon, FlameIcon } from "lucide-react";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";

export default function GroupPage() {
  return (
    <div className="">
      <div className="mt-4 border-t border-b p-4 ">
        <Textarea
          placeholder="Apa yang sedang hangat dibicarakan?!"
          className="ring-0 border-none focus-visible:ring-0 focus-visible:border-none text-xl bg-transparent"
        />
        <div className="mt-2">
          <div className="flex justify-end">
            <Button className="rounded-full">Posting</Button>
          </div>
        </div>
      </div>
      <div className="m-4">
        <div className="flex gap-x-1 items-center m-2 mt-6">
          <FlameIcon className="" />
          <span className="font-semibold ">Populer</span>
        </div>
        <article className="">
          <div className="w-full border-t border-none dark:border-solid">
            <div className="mt-1 w-full rounded-lg border px-3 py-2 transition duration-100 hover:bg-slate-50">
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex flex-col">
                  <div>
                    <span className="">{"Anonim"}</span>
                    <span className="font-bold">﹒</span>
                    <span className="">
                      {moment("2024/02/01 20:52:00").locale("id").fromNow()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2"></div>
              <div className="mt-0.5">
                <p className="text-sm text-slate-700">
                  <Link href={"/"} className="inline-block ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sint unde, nisi voluptates quasi animi temporibus aliquam
                    esse quibusdam ipsum explicabo architecto praesentium
                    reiciendis amet est similique deserunt, aspernatur fugit
                    pariatur porro. Quae reprehenderit ea dignissimos amet natus
                    aut. Sequi aperiam maiores libero, neque non nihil possimus
                    deserunt praesentium doloremque harum!
                    {
                      <span className="text-violet-500 hover:underline">
                        {" "}
                        Selengkapnya...
                      </span>
                    }
                  </Link>
                </p>
              </div>
              <div className="mt-2 flex gap-x-2 text-neutral-500">
                <div className="flex items-center justify-center rounded-full border">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="h-8 rounded-full font-normal"
                  >
                    <ChatBubbleIcon className="mr-2 h-4 w-4" />
                    <span className="text-sm">20</span>
                  </Button>
                </div>
                <div className="flex items-center justify-center rounded-full border">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="h-8 rounded-full font-normal"
                  >
                    <Share2Icon className="mr-2 h-4 w-4" />
                    <span className="text-sm">30</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="">
          <div className="w-full border-t border-none dark:border-solid">
            <div className="mt-1 w-full rounded-lg border px-3 py-2 transition duration-100 hover:bg-slate-50">
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex flex-col">
                  <div>
                    <span className="">{"Anonim"}</span>
                    <span className="font-bold">﹒</span>
                    <span className="">
                      {moment("2024/02/01 19:50:00").locale("id").fromNow()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2"></div>
              <div className="mt-0.5">
                <p className="text-sm text-slate-700">
                  <Link href={"/"} className="inline-block ">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
                    eaque quasi dolores tenetur rerum, recusandae excepturi
                    dolore! Asperiores, enim quisquam.
                  </Link>
                </p>
              </div>
              <div className="mt-2 flex gap-x-2 text-neutral-500">
                <div className="flex items-center justify-center rounded-full border">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="h-8 rounded-full font-normal"
                  >
                    <ChatBubbleIcon className="mr-2 h-4 w-4" />
                    <span className="text-sm">20</span>
                  </Button>
                </div>
                <div className="flex items-center justify-center rounded-full border">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="h-8 rounded-full font-normal"
                  >
                    <Share2Icon className="mr-2 h-4 w-4" />
                    <span className="text-sm">30</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
        <div className="flex gap-x-1 items-center m-2 mt-6">
          <AtomIcon className="" />
          <span className="font-semibold ">Terbaru</span>
        </div>
        <article className="">
          <div className="w-full border-t border-none dark:border-solid">
            <div className="mt-1 w-full rounded-lg border px-3 py-2 transition duration-100 hover:bg-slate-50">
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex flex-col">
                  <div>
                    <span className="">{"Anonim"}</span>
                    <span className="font-bold">﹒</span>
                    <span className="">
                      {moment("2024/02/01 20:52:00").locale("id").fromNow()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2"></div>
              <div className="mt-0.5">
                <p className="text-sm text-slate-700">
                  <Link href={"/"} className="inline-block ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sint unde, nisi voluptates quasi animi temporibus aliquam
                    esse quibusdam ipsum explicabo architecto praesentium
                    reiciendis amet est similique deserunt, aspernatur fugit
                    pariatur porro. Quae reprehenderit ea dignissimos amet natus
                    aut. Sequi aperiam maiores libero, neque non nihil possimus
                    deserunt praesentium doloremque harum!
                    {
                      <span className="text-violet-500 hover:underline">
                        {" "}
                        Selengkapnya...
                      </span>
                    }
                  </Link>
                </p>
              </div>
              <div className="mt-2 flex gap-x-2 text-neutral-500">
                <div className="flex items-center justify-center rounded-full border">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="h-8 rounded-full font-normal"
                  >
                    <ChatBubbleIcon className="mr-2 h-4 w-4" />
                    <span className="text-sm">20</span>
                  </Button>
                </div>
                <div className="flex items-center justify-center rounded-full border">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="h-8 rounded-full font-normal"
                  >
                    <Share2Icon className="mr-2 h-4 w-4" />
                    <span className="text-sm">30</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="">
          <div className="w-full border-t border-none dark:border-solid">
            <div className="mt-1 w-full rounded-lg border px-3 py-2 transition duration-100 hover:bg-slate-50">
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex flex-col">
                  <div>
                    <span className="">{"Anonim"}</span>
                    <span className="font-bold">﹒</span>
                    <span className="">
                      {moment("2024/02/01 19:50:00").locale("id").fromNow()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2"></div>
              <div className="mt-0.5">
                <p className="text-sm text-slate-700">
                  <Link href={"/"} className="inline-block ">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
                    eaque quasi dolores tenetur rerum, recusandae excepturi
                    dolore! Asperiores, enim quisquam.
                  </Link>
                </p>
              </div>
              <div className="mt-2 flex gap-x-2 text-neutral-500">
                <div className="flex items-center justify-center rounded-full border">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="h-8 rounded-full font-normal"
                  >
                    <ChatBubbleIcon className="mr-2 h-4 w-4" />
                    <span className="text-sm">20</span>
                  </Button>
                </div>
                <div className="flex items-center justify-center rounded-full border">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="h-8 rounded-full font-normal"
                  >
                    <Share2Icon className="mr-2 h-4 w-4" />
                    <span className="text-sm">30</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
