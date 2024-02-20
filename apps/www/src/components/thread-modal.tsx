"use client";
import { deleteThread } from "@/app/[group]/[thread]/thread.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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

type Props = PropsWithChildren<{}> & {
  thread_slug: string;
  group_slug: string;
};

export function ThreadDetailAction({ children, ...props }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowReportDialog(true)}>
            <AlertTriangle className="w-4 h-4 mr-2" /> Laporkan
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <Trash2Icon className="w-4 h-4 mr-2" /> Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteThreadModal
        {...props}
        showDialog={showDeleteDialog}
        setShowDialog={setShowDeleteDialog}
      />
      <ReportThreadModal
        {...props}
        showDialog={showReportDialog}
        setShowDialog={setShowReportDialog}
      />
    </>
  );
}

const deleteThreadSchema = z.object({
  pass: z.string().min(6),
});

export function DeleteThreadModal(
  props: Props & {
    showDialog: boolean;
    setShowDialog: (show: boolean) => void;
  },
) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof deleteThreadSchema>>({
    resolver: zodResolver(deleteThreadSchema),
  });

  const submit = async (v: z.infer<typeof deleteThreadSchema>) => {
    setLoading(true);
    const r = await deleteThread(props.thread_slug, v.pass);
    if (r.error) {
      setLoading(false);
      form.setError("pass", { message: r.error });
      return;
    }
    router.push(`/${props.group_slug}`);
  };
  return (
    <>
      <Dialog open={props.showDialog} onOpenChange={props.setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus menfess ini?</DialogTitle>
            <DialogDescription>
              Menfess yang sudah dihapus tidak dapat dikembalikan.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="pass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata sandi</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Kata sandi grup..."
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Kata sandi dibutuhkan untuk membuktikan bahwa Anda adalah
                      Admin grup.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => props.setShowDialog(false)}
                  disabled={loading}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  variant={"destructive"}
                >
                  Hapus
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ReportThreadModal(
  props: Props & {
    showDialog: boolean;
    setShowDialog: (show: boolean) => void;
  },
) {
  return (
    <>
      <Dialog open={props.showDialog} onOpenChange={props.setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Laporkan menfess ini?</DialogTitle>
            <DialogDescription>
              Menfess yang dilaporkan akan ditinjau oleh Admin grup dan akan
              dihapus apabila tidak sesuai.
            </DialogDescription>
          </DialogHeader>

          <div>
            <div className="flex justify-between">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => props.setShowDialog(false)}
                //   disabled={loading}
              >
                Batal
              </Button>
              <Button
                type="submit"
                //   disabled={loading}
                variant={"destructive"}
                onClick={() => {
                  toast.success("Menfess berhasil dilaporkan!");
                  props.setShowDialog(false);
                }}
              >
                Laporkan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
