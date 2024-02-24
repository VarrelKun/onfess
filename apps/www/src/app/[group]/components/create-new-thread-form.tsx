"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
  const [token, setToken] = useState("");

  const submit = async () => {
    setLoading(true);
    const response = await createNewThread({
      group_slug: group_id,
      content: content,
      captcha: token,
    });
    if (response.error) {
      toast.error(response.error);
      setLoading(false);
      return;
    }
    setContent("");
    onThreadCreated?.();
    router.refresh();
    setLoading(false);
    router.push(`/${group_id}/${response.data?.slug}`);
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
          className="border-none bg-transparent text-xl ring-0 focus-visible:border-none focus-visible:ring-0"
          onChange={(e) => {
            if (content.length > 1000) return;
            setContent(e.target.value);
          }}
          value={content}
        />
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
          onSuccess={(token) => setToken(token)}
          options={{
            theme: "light",
          }}
          className="hidden"
        />
        <div className="mt-2">
          <div className="flex justify-end">
            <Button
              className="rounded-full"
              disabled={content.trim().length < 3 || loading || !token}
            >
              Posting
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
