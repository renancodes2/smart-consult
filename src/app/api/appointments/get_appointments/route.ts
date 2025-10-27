import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const userId = searchParams.get("userId");
  const dateParam = searchParams.get("date");
  if (!userId) {
    return NextResponse.json({ ok: false, error: "user ID is required." }, { status: 400 });
  }
  if (!dateParam) {
    return NextResponse.json({ ok: false, error: "Date is required." }, { status: 400 }); 
  }

  try {

    const [year, month, day] = dateParam.split("-").map(Number);
    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 9999);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ ok: false, error: "User not found." }, { status: 404 });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: userId,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      }
    })

    const blockedAppointments = new Set<string>();

    for(const appointment of appointments){
      const getDuration = Math.ceil(appointment.service.duration / 30);
      const appointmentStart = user.times.indexOf(appointment.time);

      if(appointmentStart !== -1){
        for(let i = 0; i < getDuration; i++){
          const blockedTime = user.times[appointmentStart + i];
          if(blockedTime){
            blockedAppointments.add(blockedTime);
          }
        }
      }
    }
  
    const blockedTimesArray = Array.from(blockedAppointments);
    
    console.log("Blocked times:", blockedTimesArray);
    return NextResponse.json(blockedTimesArray);

  }catch(err){
    return NextResponse.json({ ok: false, error: "An error occurred while fetching appointments." }, { status: 500 });
  }


}