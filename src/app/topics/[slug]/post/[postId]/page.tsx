import CommentCreateForm from '@/components/comments/CommentCreateForm';
import CommentList from '@/components/comments/CommentList';
import PostShow from '@/components/post/post-show';
import { Button } from '@/components/ui/button';
import { ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react'

type PostShowPageProps = {
  params: Promise<{ slug: string; postId: string }>
}
const PostShowPage: React.FC<PostShowPageProps> =async ({params}) => {
  const { slug, postId } = await params;
  return (
    <div className='space-y-4 p-4'>
      <Link href={`/topics/${slug}`} className='flex cursor-pointer text-gray-700 items-center'>
      <ChevronLeft />
        <Button variant={'link'} className='cursor-pointer text-sm'>Back to Topic: {slug}</Button>
      </Link>
      <Suspense fallback={<p>Loading...</p>}>
<PostShow postId={postId} />
      </Suspense>
      
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  )
}

export default PostShowPage
