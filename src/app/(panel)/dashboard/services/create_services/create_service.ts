"use server"

import { auth } from "@/lib/auth"
import z from "zod"
import prisma from "@/lib/prisma"
const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  price: z.number().min(1, { message: "O preço é obrigatório" }),
  duration: z.number().min(1, { message: "A duração é obrigatória" })
})

type CreateServiceProps = z.infer<typeof schema>

export async function createService(data: CreateServiceProps){
  
  if(!data){
    throw new Error("Data is required")
  }

  const session = await auth();

  if(!session?.user?.id){
    throw new Error("User not authenticated")
  }
  
  const schemaParse = schema.safeParse(data)

  if(!schemaParse.success){
    throw new Error(schemaParse.error.issues[0].message);
  }

  const { name, price, duration } = schemaParse.data;

  const userId = session.user.id;

  try {
    const response = await prisma.service.create({
      data: {
        name,
        userId,
        price,
        duration,
      }
    })

    return {
      data: response
    }

  }catch(err){
    throw new Error("Error to create service")
  }
  
}