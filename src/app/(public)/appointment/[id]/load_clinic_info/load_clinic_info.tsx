import prisma from "@/lib/prisma"


export async function loadClinicInfo(id: string){

  if(!id) throw new Error("I couldn't find information about the clinic.");

  try {
    const userInfo = await prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        service: {
          where: {
            status: true,
          }
        }, 
        subscription: true,
      }
    })

    if(!userInfo) throw new Error("I couldn't find information about the clinic.");

    return userInfo;

  }catch(err){
    return null;
  }
}