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
import { createTopics } from "@/actions/create-topics";
import { useActionState } from "react";
const TopicForm = () => {
  const [formState, action] = useActionState(createTopics, { errors: {} });
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>New Topic</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Create a Topic</DialogTitle>
              <DialogDescription>
                Write a new Topic to start Discussion. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name" name="name" />
              </div>
              {formState.errors.name && (
                <p className="text-red-600 p-2 text-sm">
                  {formState.errors.name}
                </p>
              )}
              <div className="grid gap-3 mb-3">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" />
              </div>
            </div>
            {formState.errors.description && (
              <p className="text-red-600 p-2 text-sm">
                {formState.errors.description}
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

export default TopicForm;
