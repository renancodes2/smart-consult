'use client'

import { useSchemaForm } from "./schema-zod";
import Image from "next/image";
import AvatarImg from "../../../../../assets/avatar.png";

import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FiCalendar } from "react-icons/fi";

import {
  Form,
  FormControl,
  FormDescription,
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

export function ProfileContent(){

  const schemaForm = useSchemaForm();
  const [selectedHour, setSelectedHour] = useState<string[]>([]);
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

  return (
    <div>
      <Form {...schemaForm}>
        <form action="">
          <Card>
            <CardContent>
              <div className="flex flex-col lg:flex-row">
                <div className="lg:border-r-1 border-dashed border-gray-500 md:px-10 flex items-center justify-center flex-col">
                  <div className="w-60 h-60 rounded-full relative overflow-hidden">
                    <Image 
                      src={AvatarImg}
                      alt="Test"
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center mt-4 text-2xl">Renan Gabriel</p>
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
                        <FormLabel className="pb-2">Número de telefone: </FormLabel>
                        <FormControl>
                          <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value ? "active" : "inactive"}>
                            <SelectTrigger>
                              <SelectValue placeholder="A clinica está aberta ou fechada?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Ativo</SelectItem>
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
                                ${selectedHour.includes(item) ? "border-gray-800 border-2 scale-105" : ""}
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
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}