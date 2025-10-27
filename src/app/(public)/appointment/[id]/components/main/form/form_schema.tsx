"use client"

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const schema = z.object({
  name: z.string().min(0, "O campo nome é obrigatório!"),
  phoneNumber: z.string().min(0, "O campo telefone é obrigatório!"),
  email: z.string().min(0, "O campo email é obrigatório!"),
  date: z.date(),
  serviceId: z.string().min(0, "Precisa seleciona um serviço!")
})

export interface UseSchema extends z.infer<typeof schema>{}

export const appointmentSchema = () => {
  return useForm<UseSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      date: new Date(),
      serviceId: ""
    }
  })
}