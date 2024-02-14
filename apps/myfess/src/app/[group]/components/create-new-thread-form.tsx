"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createNewThread } from "../[thread]/thread.actions";

export default function CreateNewThreadForm({
  group_slug: group_id,
  onThreadCreated,
}: {
  group_slug: string;
  onThreadCreated?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const submit = async () => {
    setLoading(true);
    const thread = await createNewThread({
      group_slug: group_id,
      content: content,
    });
    setContent("");
    onThreadCreated?.();
    router.refresh();
    setLoading(false);
    router.push(`/${group_id}/${thread.slug}`);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Textarea
          placeholder="Apa yang ingin kamu ungkapkan?!"
          className="ring-0 border-none focus-visible:ring-0 focus-visible:border-none text-xl bg-transparent"
          onChange={(e) => {
            if (content.length > 1000) return;
            setContent(e.target.value);
          }}
          value={content}
        />
        <div className="mt-2">
          <div className="flex justify-end">
            <Button className="rounded-full" disabled={loading}>
              Posting
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
