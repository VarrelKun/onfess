import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatBubbleIcon, Share2Icon } from "@radix-ui/react-icons";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";

type Props = {
  params: {
    thread: string;
  };
};

export default function Thread(props: Props) {
  return (
    <div className="mb-20 mt-10">
      <div className="">
        <Post />
        <div className="mt-6 m-4">
          <p className="font-semibold">Kirim tanggapan:</p>
          <div className="mt-4 pb-4">
            <Textarea placeholder="Apa tanggapan kamu?!" className="" />
            <div className="mt-2">
              <div className="flex justify-end">
                <Button className="rounded-full">Kirim</Button>
              </div>
            </div>
          </div>
          <p className="font-semibold mt-4">Tanggapan:</p>
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
}

function Post() {
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
                  {moment("2024/02/01 10:50:00").locale("id").fromNow()}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              optio nulla cumque delectus voluptatibus aspernatur at. Illo ipsum
              a possimus nam laborum, soluta expedita nihil magnam illum dolorem
              molestias sint reprehenderit nobis architecto exercitationem
              aliquam reiciendis facilis deserunt totam natus voluptates
              delectus. At blanditiis suscipit, dolore molestias minima earum
              vitae.
            </p>
          </div>
          <div className="mt-4 flex gap-x-2 text-neutral-500">
            <div className="flex items-center justify-center rounded-full border">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="h-8 rounded-full font-normal"
              >
                <ChatBubbleIcon className="mr-2 h-4 w-4" />
                <span className="text-sm"> {10}</span>
              </Button>
            </div>
            <div className="flex items-center justify-center rounded-full border">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="h-8 rounded-full font-normal"
              >
                <Share2Icon className="mr-2 h-4 w-4" />
                <span className="text-sm"> {20}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Comment() {
  return (
    <div className="mb-6 mt-3 w-full border-t border-none dark:border-solid">
      <div className="mt-1 w-full rounded-lg px-3 py-2 transition duration-100 hover:bg-slate-50">
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex flex-col">
            <div>
              <span className="inline-flex w-fit items-center">Anonim</span>
              <span className="font-bold">﹒</span>
              <span className="text-muted-foreground">5 jam lalu</span>
            </div>
          </div>
        </div>
        <div className="mt-1">
          <p className="text-sm">
            <Link href={"/abc/thread2321"} className="inline-block ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              rerum quae, voluptate accusantium similique aspernatur sequi atque
              commodi dignissimos vel, ad incidunt! Voluptatum obcaecati
              excepturi quisquam quibusdam totam! Consequatur doloremque, ut,
              nam distinctio omnis reiciendis maxime libero cumque deleniti
              architecto, tempora natus iure vel atque.
            </Link>
          </p>
        </div>
        <div className="mt-4 flex gap-x-2 text-neutral-500">
          <div className="flex items-center justify-center rounded-full">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="h-8 rounded-full font-normal"
            >
              <ChatBubbleIcon className="mr-2 h-4 w-4" />
              <span className="text-sm">2</span>
            </Button>
          </div>
          <div className="flex items-center justify-center rounded-full">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="h-8 rounded-full font-normal"
            >
              <Share2Icon className="mr-2 h-4 w-4" />
              <span className="text-sm">5</span>
            </Button>
          </div>
        </div>
      </div>
      <SubComment />
      <SubComment />
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
