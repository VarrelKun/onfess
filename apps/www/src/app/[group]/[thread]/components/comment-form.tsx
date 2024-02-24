"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile } from "@marsidev/react-turnstile";
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
  const [token, setToken] = useState("");

  const submit = async () => {
    setLoading(true);
    await sendThreadComment({
      thread_slug: thread_slug,
      content: content,
      captcha: token,
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
        className="mx-4"
      >
        <div className="mt-4 pb-4">
          <Textarea
            placeholder="Apa tanggapan kamu?!"
            className=""
            onChange={(e) => {
              if (content.length > 1000) return;
              setContent(e.target.value);
            }}
            disabled={loading}
            value={content}
          />
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
            onSuccess={(token) => {
              setToken(token);
            }}
            options={{
              theme: "light",
            }}
            className="hidden"
          />
          <div className="mt-2 flex justify-end">
            <Button
              className="rounded-full"
              disabled={content.trim().length < 3 || loading}
            >
              Posting
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
