"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTopicsSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .regex(/^[a-zA-Z0-9- ]*$/, {
      message: "Name can only contain letters, numbers, and spaces",
    }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be less than 500 characters long"),
});

type CreateTopicFormState = {
  errors: {
    name?: string[];
    description?: string[];
    formError?: string[];
  };
};

export const createTopics = async (
  prevState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> => {
  const result = createTopicsSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if(!session || !session.user) {
    return {
      errors: {
        formError: ["You must be logged in to create a topic."],
      },
    };
  }
let topic : Topic;
  try {
   topic= await prisma.topic.create({
      data:{
        slug: result.data.name,
        description : result.data.description,
      }
    })
  } catch (error) {
    if(error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    }
    else{
      return {
        errors: {
          formError: ["An unexpected error occurred while creating the topic."],
        },
      };
    }
  }

 revalidatePath("/");
 redirect(`/topics/${topic.slug}`);

};
