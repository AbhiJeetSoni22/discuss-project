"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";
import { createPost } from "@/actions/create-post";

type PostCreateFormProps= {
  slug: string;
}

const PostCreateForm:React.FC<PostCreateFormProps>= ({slug}) => {
  const [formState, action] = useActionState(createPost.bind(null,slug), { errors: {} });
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Create Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Create a Post</DialogTitle>
              <DialogDescription>
                Write a new Post to start Discussion. Click save when
                your are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" />
              </div>
              {formState.errors.title && (
                <p className="text-red-600 p-2 text-sm">
                  {formState.errors.title}
                </p>
              )}
              <div className="grid gap-3 mb-3">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" />
              </div>
            </div>
            {formState.errors.content && (
              <p className="text-red-600 p-2 text-sm">
                {formState.errors.content}
              </p>
            )}
            {formState.errors.formError && (
              <div className="text-red-600 p-2 text-sm">
                {formState.errors.formError}
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default PostCreateForm;
