import PostList from "@/components/post/post-list";
import TopicForm from "@/components/topics/TopicForm";
import { fetchTopPosts } from "@/lib/query/post";



export default function Home() {
 

  return (
    <div className="p-4 grid grid-cols-4 ">
      <div className="col-span-3">
        <h1 className="font-bold text-xl m-2">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      
      <div className="m-2">
        <TopicForm/>
        
      </div>

    
    </div>
  )
}
