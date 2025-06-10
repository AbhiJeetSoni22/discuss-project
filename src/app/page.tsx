import TopicForm from "@/components/topics/TopicForm";



export default function Home() {
 

  return (
    <div className="p-4 grid grid-cols-4 ">
      <div className="col-span-3">
        <h1 className="font-bold text-xl m-2">Home page</h1>
      </div>
      
      <div className="m-2">
        <TopicForm/>
      </div>

    
    </div>
  )
}
