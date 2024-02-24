"use client";

import { createNewGroup } from "@/app/[group]/group.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "./spinner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const createNewGroupSchema = z.object({
  name: z.string().min(3).max(30),
  password: z.string().min(6),
  token: z.string({ required_error: "Verifikasi reCAPTCHA diperlukan" }),
});

export function CreateNewGroupModal<P>({ children }: PropsWithChildren<P>) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const form = useForm<z.infer<typeof createNewGroupSchema>>({
    resolver: zodResolver(createNewGroupSchema),
  });

  const submit = async (v: z.infer<typeof createNewGroupSchema>) => {
    setLoading(true);
    const response = await createNewGroup({
      name: v.name,
      password: v.password,
      captcha: v.token,
    });

    if (response.error) {
      form.setError("token", {
        message: response.error,
      });
    }

    router.push(`/${response.data?.slug}`);
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat grup baru</DialogTitle>
            <DialogDescription>
              Grup baru untuk berbagi menfess dengan teman-temanmu.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Grup</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nama grup kamu..."
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata Sandi</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        placeholder="Kata sandi admin grup kamu..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Kata sandi ini akan diperlukan ketika kamu mengatur grup
                      sebagai admin.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
                      onSuccess={(token) => {
                        form.setValue("token", token);
                        setToken(token);
                      }}
                      options={{
                        theme: "light",
                      }}
                      className="hidden"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => setShowDialog(false)}
                  disabled={loading}
                >
                  Batal
                </Button>
                <div className="flex items-center">
                  {!token && <Spinner className="mr-4" />}
                  <Button type="submit" disabled={loading || !token}>
                    Buat Grup
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
