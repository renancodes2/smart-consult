'use client'

import { ProfileFormData, useSchemaForm } from "./schema-zod";
import Image from "next/image";
import AvatarImg from "../../../../../assets/avatar.png";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FiCalendar, FiLogOut } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";  
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { timezone } from "../_timezone/get_timezone";
import { Prisma } from "@/generated/prisma";
import { toast } from "sonner";
import { formatPhoneNumber, removeCharacters } from "@/utils/format-phone-number";
import { useRouter } from "next/navigation";
import { updateUser } from "../_actions/update";

export type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  }
}>

interface ProfileContentDataProps {
  user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentDataProps){

  const schemaForm = useSchemaForm({ user });
  const router = useRouter();
  const { update } = useSession();
  const [selectedHours, setSelectedHour] = useState<string[]>(user?.times ?? []);
  const [showDialog, setShowDialog] = useState<boolean>(false)

  function creationTimestamp(): string[] {
    const hours: string[] = [];

    for(let h = 8; h <= 24; h++) {
      for(let m = 0; m < 2; m++) {
        const hour = h.toString().padStart(2, "0");
        const minutes = (m * 30).toString().padStart(2, "0")
        hours.push(`${hour}:${minutes}`)
      }
    }

    return hours;
  }

  const hours = creationTimestamp();

  function increaseHour(hour: string){
    setSelectedHour(prev => prev.includes(hour) ? prev.filter(hr => hr !== hour) : [...prev, hour].sort())
  }

  async function onSubmit(value: ProfileFormData){

    const cleanCharacters = removeCharacters(value.phone ? value.phone : "")

    const updataProfile = await updateUser({
      name: value.name,
      address: value.address,
      status: value.status === "active" ? true : false,
      timeZone: value.timeZone,
      phone: cleanCharacters,
      times: selectedHours || []
    })

    if(!updataProfile) {
      toast.error("Error ao tentar atualizar!!")
      return;
    }

    console.log(updataProfile);

    toast.success("Perfil atualizado com sucesso!!")

  }


  const handleLogout = async () => {
    await signOut();
    await update();
    router.push("/")
  }
  
  return (
    <div>
      <Form {...schemaForm}>
        <form onSubmit={schemaForm.handleSubmit(onSubmit)}>
          <Card>
            <CardContent>
              <div className="flex flex-col lg:flex-row">
                <div className="lg:border-r-1 border-dashed border-gray-500 md:px-10 flex items-center  flex-col">
                  <div className="w-60 h-60 rounded-full relative overflow-hidden">
                    <Image 
                      src={user?.image ? user?.image : AvatarImg}
                      alt="Test"
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center mt-4 text-2xl">Renan Gabriel</p>

                  <div>
                    <button 
                      className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-md mt-4 font-medium cursor-pointer"
                      onClick={handleLogout}
                    >
                      <FiLogOut/> Sair da conta
                    </button>
                  </div>
                </div>
                <div className="lg:ml-10 mt-10 lg:w-full flex flex-col gap-4">
                  <FormField
                    control={schemaForm.control}
                    name="name" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-2">Name completo: </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Digite seu nome completo..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={schemaForm.control}
                    name="address" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-2">Endereço completo: </FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            placeholder="Endereço completo..." 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={schemaForm.control}
                    name="phone" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-2">Número de telefone: </FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            placeholder="Número de telefone..."
                            onChange={(e) =>{
                              const formatted = formatPhoneNumber(e.target.value);
                              field.onChange(formatted)
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={schemaForm.control}
                    name="status" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-2">Status da loja: </FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value ? "active" : "inactive"}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="A clinica está aberta ou fechada?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">ATIVA</SelectItem>
                              <SelectItem value="inactive">INATIVA</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> 

                  <div className="flex flex-col gap-4 items-start">
                    <Label>
                      Configurar horarios
                    </Label>
                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                      <div className="flex w-full justify-between border-1 border-gray-400 p-2.5 rounded-md">
                        <span>Selecione os horarios</span>
                        <DialogTrigger className="cursor-pointer">
                          <FiCalendar size={24} color="#909090" />
                        </DialogTrigger>
                      </div>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <section className="grid grid-cols-6 gap-4">
                          {hours.map((item) => (
                            <button
                              onClick={() => increaseHour(item)}
                              key={item}
                              className={`
                                border-1 border-gray-300 
                                ${selectedHours.includes(item) ? "border-gray-800 border-2 scale-105" : ""}
                                p-2 rounded-md flex items-center justify-center 
                                transition-all duration-300 ease-in-out transform cursor-pointer
                              `}
                            >
                              <p>{item}</p>
                            </button>
                          ))}
                        </section>  

                        <Button 
                          className="cursor-pointer"
                          onClick={() => setShowDialog(false)}
                        >
                          Agendar horarios
                        </Button>

                      </DialogContent>
                    </Dialog>
                  </div>           

                  <FormField
                    control={schemaForm.control}
                    name="timeZone" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-2">Fuso Horário: </FormLabel>
                        <FormControl>
                          <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Qual é o fuso horário da clinica?" />
                            </SelectTrigger>
                            <SelectContent>
                              {timezone.map((item) => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />     

                  <Button className="cursor-pointer">
                    Atualizar perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}