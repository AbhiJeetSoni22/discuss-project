'use server'
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";

const createPostSchema = z.object({
    title:z.string().min(3, "Title must be at least 3 characters long"),
    content:z.string().min(10, "Content must be at least 10 characters long"),
})
type CreatePostFromState= {
    errors:{
        title?: string[];
        content?: string[];
        formError?: string[];
    }
}
export const createPost = async(slug:string,prevState:CreatePostFromState,formdata:FormData): Promise<CreatePostFromState>=>{
const title = formdata.get("title") as string;
const content = formdata.get("content") as string;
const result = createPostSchema.safeParse({title, content});
if(!result.success){
    return {
        errors: result.error.flatten().fieldErrors,
    };
}
const session = await auth();
if(!session || !session.user || !session.user.id) {
    return {
        errors: {
            formError: ["You must be logged in to create a post."],
        },
    };
}
const topic = await prisma.topic.findFirst({
    where:{
        slug
    }
})
if(!topic) {
    return {
        errors: {
            formError: ["Topic not found."],
        },
    };
}
let post:Post;
try {
   post= await prisma.post.create({
        data: {
            title: result.data.title,
            content: result.data.content,
           userId: session.user.id, // Assuming session.user.id is the author's ID
            topicId: topic.id , // Assuming you pass topicId in the form data
        },
    })
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
            formError: ["An unexpected error occurred."],
        },
    };
    
}

revalidatePath(`/topics/${slug}`);
redirect(`/topics/${slug}/post/${post.id}`);

}