"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/generated/prisma";
import { FiDelete, FiEdit, FiLoader } from "react-icons/fi";
import { deleteService } from "../delete_service/delete_service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {  
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Form, FormProvider } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils/convert-to-cents-value";
import { useDialogServices } from "./dialog_form";
import { Button } from "@/components/ui/button";
import { updateService } from "../update_service/update_service";
import { set } from "zod";

interface ServicesContentProps {
  services: Service[];
}

interface FormData {
  name: string;
  price: string;
  hours: string;
  minutes: string;
}

export function ServicesContent({ services }: ServicesContentProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [serviceToUpdate, setServiceToUpdate] = useState<Service | null>(null);
  const [loanding, setLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (id: string) => {
    if(!id) return;
    const response = await deleteService(id)

    if(!response) {
      toast.error("Erro ao deletar serviço");
      return;
    }
    toast.success("Serviço deletado com sucesso!");
    router.refresh();
  }

   const handleUpdateService = async (service: Service) => {

    if(!service) {
      console.error("Erro ao carregar serviço para atualização:", service);
      toast.error("Erro ao carregar serviço para atualização.");
      return;
    }
    setServiceToUpdate(service);
    setShowDialog(true); 

  };

  const methods = useDialogServices({
    initialValues: {
      name: serviceToUpdate?.name || "",
      price: serviceToUpdate?.price !== undefined ? String(serviceToUpdate.price) : "",
      hours: serviceToUpdate?.duration ? String(Math.floor(serviceToUpdate.duration / 60)) : "00",
      minutes: serviceToUpdate?.duration ? String(serviceToUpdate.duration % 60) : "00",
    }
  });

  const { control, handleSubmit, setValue } = methods;

  const onSubmitForm = async (data: FormData) => {
    setLoading(true);
    const duration = (Math.floor(Number(data.hours)) * 60 + Math.floor(Number(data.minutes))) || 0;

    const payload = {
      id: serviceToUpdate?.id || "",
      name: data.name,
      price: Number(data.price.replace(/[^\d]/g, '')) || 0,
      duration: duration,
    };

    if(!payload.id) {
      toast.error("ID do serviço não encontrado.");
      return;
    }

    const response = await updateService({ data: payload });

    if(!response) {
      setLoading(false);
      toast.error("Erro ao atualizar serviço");
      return;
    }

    setLoading(false);
    console.log("Serviço atualizado:", response);
    setShowDialog(false);
    router.refresh();
    toast.success("Serviço atualizado com sucesso!");
  };

  useEffect(() => {
    if (serviceToUpdate) {
      setValue("name", serviceToUpdate.name);
      setValue("price", serviceToUpdate.price !== undefined ? String(serviceToUpdate.price) : "");
      setValue("hours", String(Math.floor(serviceToUpdate.duration / 60)));
      setValue("minutes", String(serviceToUpdate.duration % 60));
    }
  }, [serviceToUpdate, setValue]);


  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>  
      <section className="space-y-3 mt-5">
        {services.map((item) => (
          <Card key={item.id}>
            <article className="flex items-center justify-between px-4"> 
              <div className="flex items-center gap-3">
                <h3>{item.name}</h3> 
                <h3>{item.price}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                >
                  <FiDelete size={20} color="red"/>
                </span>
                <span 
                  className="cursor-pointer"
                  onClick={() => handleUpdateService(item)}
                >
                  <FiEdit size={20} color="blue"/>
                </span>
              </div>
            </article>
          </Card>
        ))}

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualize o serviço</DialogTitle>
            <DialogDescription>
              Atualize os detalhes do serviço.
            </DialogDescription>
          </DialogHeader>

          <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
                <FormField
                  control={control}
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
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pb-1">Preço do serviço</FormLabel> 
                      <FormControl>
                        <Input 
                          placeholder="$220.00..." 
                          {...field} 
                          onChange={(e) => {
                            formatCurrency(e);
                            field.onChange(e);
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
                    control={control}
                    name="hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-1">Horas</FormLabel> 
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
                    control={control}
                    name="minutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-1">Minutos</FormLabel> 
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
                  className={`w-full ${loanding ? 'bg-gray-600' : 'bg-gray-900' }`}
                >
                  {loanding ? 
                    <button 
                      className="animate-spin"
                      disabled
                    >
                      <FiLoader size={35} color="#ddd"/>
                    </button> 
                    : "Atualizar Serviço"}
                </Button>
              </form>
          </FormProvider>
        </DialogContent>
      </section>
    </Dialog>
  );
}