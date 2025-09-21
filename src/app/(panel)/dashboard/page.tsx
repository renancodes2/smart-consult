import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard(){
  const session = await getSession();

  if(!session) redirect("/");
  
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}