"use server"

import prisma from "@/lib/prisma";

interface GetServicesProps {
  userId: string;
}

export default async function getServices({ userId }: GetServicesProps){

  if(!userId) return;

  try {
    const services = await prisma.service.findMany({
      where: {
        userId: userId,
        status: true
      }
    })

    if(!services) return;

    return services;


  }catch(err){
    console.log(err)
    return null;
  }

}