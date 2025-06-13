"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(3, "Content must be at least 3 characters long"),
});

type CreateCommentState = {
  errors: {
    content?: string[];
    formError?: string[];
  };
};

export const createComment = async (
  { postId, parentId }: { postId: string; parentId?: string },
  prevState: CreateCommentState,
  formdata: FormData
): Promise<CreateCommentState> => {
  const result = createCommentSchema.safeParse({
    content: formdata.get("content") as string,
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        formError: ["You must be logged in to reply a comment."],
      },
    };
  }

  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        postId: postId, // Assuming postId is passed correctly
        userId: session.user.id, // Assuming session.user.id is the author's ID
        parentId: parentId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    }
    return {
      errors: {
        formError: ["Failed to reply comment ."],
      },
    };
  }
  const topic = await prisma.topic.findFirst({
    where: {
      posts: { some: { id: postId } },
    },
  });

  if (!topic) {
    return {
      errors: {
        formError: ["Topic not found."],
      },
    };
  }
  revalidatePath(`/topics/${topic.slug}/post/${postId}`);
  return{
    errors: {},
  }
};
