import { getSession } from "next-auth/react";
import { CreateServicesContent } from "./create_services_content";
import { ServicesContent } from "./services_content";
import getServices from "../_get_services/get_services";

interface ServiceOverviewProps {
  userId: string;
}

export async function ServiceOverview({ userId }: ServiceOverviewProps){

  const services = await getServices({ userId: userId }) || [];

  return (
    <>
      <CreateServicesContent />
      <ServicesContent services={services} />    
    </>
  )
}