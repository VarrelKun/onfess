"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendThreadComment } from "../thread.actions";

export default function CommentForm({
  thread_slug,
  onCommentPosted,
}: {
  thread_slug: string;
  onCommentPosted?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const submit = async () => {
    setLoading(true);
    await sendThreadComment({
      thread_slug: thread_slug,
      content: content,
    });
    setContent("");
    onCommentPosted?.();
    setLoading(false);
    router.refresh();
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="mt-4 pb-4">
          <Textarea
            placeholder="Apa tanggapan kamu?!"
            className=""
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            value={content}
          />
          <div className="flex justify-end mt-2">
            <Button className="rounded-full" disabled={loading}>
              Posting
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
