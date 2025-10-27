"use server"

import prisma from "@/lib/prisma";

interface CreateAppointmentProps { 
  name: string;
  email: string;
  phone: string;
  time: string;
  appointmentDate: Date;
  serviceId: string;
  userId: string;
}

export async function createAppointment(data: CreateAppointmentProps){

  if(!data) return null;

  const { 
    appointmentDate, 
    email, 
    phone, 
    serviceId, 
    time, 
    name,
    userId
  } = data;
  
  try {

    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate,
        email,
        phone,
        serviceId,
        time,
        name,
        userId
      }
    })

    console.log("Agendamento criado com sucesso: " + appointment)
    return appointment;
    

  }catch(err){
    console.log(err)
    // throw new Error("Could not create appointment.");
  }
}