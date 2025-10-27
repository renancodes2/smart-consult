"use server"

import prisma from "@/lib/prisma";


interface UpdateServicePayload { 
  data: {
    id: string;
    name: string;
    price: number;
    duration: number;
  }
}


export async function updateService({ data }: UpdateServicePayload) {
  if(!data.id) return;

  const { id, name, price, duration } = data;
  

  try {
    const update = prisma.service.update({
      where: {
        id
      },
      data: {
        name,
        price,
        duration
      }
    })

    return update;

  }catch(err){
    console.log(err)
    return null;
  }
}