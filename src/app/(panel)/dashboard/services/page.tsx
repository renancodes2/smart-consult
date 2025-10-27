import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import getServices from "./_get_services/get_services";
import { ServiceOverview } from "./_components/service_overview";

export default async function Services(){

  const session = await getSession();

  if(!session) redirect("/dashboard");

  const userId = session?.user?.id;
      
  return <ServiceOverview userId={userId} />
}