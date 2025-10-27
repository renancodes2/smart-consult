"use server"
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function deleteService(id: string){
  if(!id) return;

  const session = await auth();
  try {

    const response = await prisma.service.update({
      where: {
        id: id,
        userId: session?.user?.id,
      },
      data: {
        status: false,
      }
    })

    return response;

  }catch(err){
    console.log(err)
  }
}