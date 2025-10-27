"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { success, z } from "zod";

const updateForm = z.object({
  name: z.string().min(1, { message: "The name field is required" }),
  address: z.string().optional(),
  phone: z.string().optional(), 
  status: z.boolean(),
  timeZone: z.string(),
  times: z.array(z.string())
})

type FormSchama = z.infer<typeof updateForm>

export async function updateUser(formData: FormSchama) {

  const session = await auth();

  const userId = session?.user?.id;

  if(!userId) return { error: "Restricted access. Only logged-in users can access this page" };

  const schema = updateForm.safeParse(formData)

  if(!schema.success) return { error: "Fill in all fields" };

  const {
    name,
    address,
    phone,
    status,
    timeZone, 
    times 
  } = formData;

  try {
    const res = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        address,
        phone,
        status,
        timeZone,
        times
      }
    })

    revalidatePath("dashboard/profile")

    return { success: "Data updated successfully" }

  }catch(err){
    return { error: "Failed to update data. Please try again later"}
  }

}