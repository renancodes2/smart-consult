"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProfileSchema = z.object({
  name: z.string().min(1, { message: "O campo nome é obrigatorio" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.string(),
  timeZone: z.string().min(1, { message: "O campo time zone é obrigatorio" })

})

type ProfileFormData = z.infer<typeof ProfileSchema>

export function useSchemaForm(){
  return useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      status: "",
      timeZone: ""
    }
  })
}