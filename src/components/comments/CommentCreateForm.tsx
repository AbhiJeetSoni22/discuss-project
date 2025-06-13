"use client";
import React, { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { createComment } from "@/actions/create-commnet";
import { Loader2 } from "lucide-react";


type CommentCreateFormProps = {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
};
const CommentCreateForm : React.FC<CommentCreateFormProps> = ({postId,parentId,startOpen}) => {
  const [open, setOpen] = useState(true);
  const [formState, action, isPending]= useActionState(createComment.bind(null,{postId,parentId}), { errors: {} });
  return (
    <div>
      <Button className="cursor-pointer" size={"sm"} onClick={() => setOpen(!open)} variant={"link"}>
        Reply
      </Button>
      {open && (
        <form className="flex flex-col gap-2 mt-2" action={action}>
          <textarea
          name="content"
            id="content"
            className="border rounded bg-gray-100 focus-visible:ring-0 p-2"
            placeholder="Write your comment here..."
            rows={4}
          />
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
          <Button
          disabled={isPending}
            variant={"secondary"}
            size={"sm"}
            type="submit"
            className="self-end cursor-pointer "
          >
            {
                isPending ? (
                    <>
                    <Loader2/>
                    please wait
                    </>
                    
                ):(
                    <>
                    Save
                    </>
                )
            }
            
          </Button>
        </form>
      )}
    </div>
  );
};

export default CommentCreateForm;
