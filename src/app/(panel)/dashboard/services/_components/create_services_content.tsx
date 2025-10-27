"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; 
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { DialogServicesFormData, useDialogServices } from "./dialog_form";
import { formatCurrency } from "@/utils/convert-to-cents-value";
import { transformToCentavos } from "@/utils/convert-real-to-centavos";
import { createService } from "../create_services/create_service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateServicesContent() {

  const [showDialog, setShowDialog] = useState(false);  
  const router = useRouter();
  const dialogSchema = useDialogServices();

  const onSubmitForm = async (data: DialogServicesFormData) => {

    const centavos = transformToCentavos(data.price);

    const payload = {
      name: data.name,
      price: centavos,
      duration: (Math.floor(Number(data.hours)) * 60 + Math.floor(Number(data.minutes))) || 0,
    }

    const res = await createService(payload);

    if(!res) {
      toast.error("Erro ao criar serviço");
      return;
    }

    toast.success("Serviço criado com sucesso!");
    router.refresh();
    setShowDialog(false);

    dialogSchema.reset();
  }

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Serviços</CardTitle>
            <DialogTrigger className="bg-black rounded-md p-1 cursor-pointer hover:opacity-80">
              <FiPlus size={20} color="#fff" />
            </DialogTrigger>
          </CardHeader>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicione um novo serviço</DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
          </DialogHeader>

          <Form {...dialogSchema}>
              <form className="space-y-5" onSubmit={dialogSchema.handleSubmit(onSubmitForm)}>
                <FormField
                  control={dialogSchema.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pb-1">Nome do serviço</FormLabel> 
                      <FormControl>
                        <Input placeholder="Corte de cabelo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={dialogSchema.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pb-1">Preço do serviço</FormLabel> 
                      <FormControl>
                        <Input 
                          placeholder="$220.00..." 
                          {...field} 
                          onChange={(e) => {
                            formatCurrency(e)
                            field.onChange(e)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p>Quanto tempo o serviço leva para ser concluído?</p>

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={dialogSchema.control}
                    name="hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-1">horas</FormLabel> 
                        <FormControl>
                          <Input 
                            placeholder="00" 
                            {...field}
                            type="number"
                            min={0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />  
                  <FormField
                    control={dialogSchema.control}
                    name="minutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-1">minutos</FormLabel> 
                        <FormControl>
                          <Input 
                            placeholder="00"
                            {...field} 
                            type="number"
                            min={0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />            
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                >
                  Salvar
                </Button>
              </form>
            </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}