import PostList from '@/components/post/post-list';
import PostCreateForm from '@/components/post/PostCreateForm';
import { fetchPostByTopicSlug } from '@/lib/query/post';
import React from 'react'

type TopicShowPageProps = {
  params: Promise<{slug: string}>
}
const TopicShowPage:React.FC<TopicShowPageProps> = async({params}) => {
  const { slug } = await params;
  return (

    <div className='grid grid-cols-4 gap-4 p-4'>

    <div className='col-span-3'>
      <h1 className='font-bold text-2xl '> 
        Topic: {slug}
         </h1>
        <div className='mt-4'>

         <PostList fetchData = {()=> fetchPostByTopicSlug(slug)} />
        </div>
     
     
    </div>
    <div>
      <PostCreateForm slug={slug}/>
     
    </div>
    </div>
  )
}

export default TopicShowPage
