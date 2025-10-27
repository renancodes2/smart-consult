import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";


const schema = z.object({
  name: z.string().min(1, { message: "O campo name é obrigatório"}),
  price: z.string().min(1, { message: "O campo preço é obrigatório"}),
  hours: z.string(),
  minutes: z.string()
})

export interface UseDialogServicesProsp {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  }
}

export type DialogServicesFormData = z.infer<typeof schema>;
 
export function useDialogServices({ initialValues }: UseDialogServicesProsp = {}){

  return useForm<DialogServicesFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValues?.name || "",
      price: initialValues?.price || "",
      hours: initialValues?.hours || "",
      minutes: initialValues?.minutes || ""
    }
  })
}