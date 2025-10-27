"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserWithSubscription } from "./profile";
import { formatPhoneNumber } from "@/utils/format-phone-number";

const ProfileSchema = z.object({
  name: z.string().min(1, { message: "The name field is required" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.string(),
  timeZone: z.string().min(1, { message: "The time zone field is required" }),
})

export type ProfileFormData = z.infer<typeof ProfileSchema>

interface useSchemaFormDefaultValue {
  user: UserWithSubscription;
}

export function useSchemaForm({ user }: useSchemaFormDefaultValue){
  return useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || "",
      address: user?.address || "",
      phone: formatPhoneNumber(user?.phone ? user?.phone : "") ||  "",
      status: user?.status ? "active" : "inactive",
      timeZone: user?.timeZone ||  ""
    }
  })
}
