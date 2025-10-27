"use client"

import Image from "next/image";
import Avatar from "../../../../../../assets/avatar.png"
import { FiMapPin } from "react-icons/fi";
import { appointmentSchema, schema, UseSchema } from "./form/form_schema";
import { formatPhoneNumber } from "@/utils/format-phone-number";
import { DateTime } from "./date_time/date_time";
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserWithServicesAndSubscription } from "../appointment_content";
import { useCallback, useEffect, useState } from "react";
import { AppointmentTimes } from "./appointment_times/appointment_times";
import { createAppointment } from "./create_appointment/create_appointment";
import { toast } from "sonner";

interface MainProps {
  clinicInfo: UserWithServicesAndSubscription;
}

export interface AvailableTime {
  time: string;
  isAvailable: boolean;
}

export function Main({ clinicInfo }: MainProps){
  const schemaForm = appointmentSchema();

  const selectedDate = schemaForm.watch("date");
  const selectedServiceId = schemaForm.watch("serviceId");

  const [selectedTime , setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmitAppointment = async (data: UseSchema) => {

    if(!data || !selectedTime) return;

    const selectedDate = new Date(data.date);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    const appointmentDate = new Date(year, month - 1, day);

    const {
      name,
      email,
      phoneNumber: phone,
      serviceId,
    } = data;

    const payload = {
      name,
      email,
      phone,
      serviceId,
      appointmentDate,
      time: selectedTime,
      userId: clinicInfo.id
    }

    const response = await createAppointment(payload);

    if(response){
      toast.success("Agendamento realizado com sucesso!");
      schemaForm.reset();
      setSelectedTime("");
    }else{
      toast.error("Houve um erro ao realizar o agendamento, tente novamente mais tarde!");
    }
  }

  const callbackDateTime = useCallback(async (dateTime: Date): Promise<string[]> => {
    try {
      const dateStr = dateTime.toISOString().split("T")[0];

      const response = await fetch(`
        ${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/get_appointments?userId=${clinicInfo.id}&date=${dateStr}
      `);

      if(!response.ok){
        return [];
      }

      const data = await response.json();

      return data;

    }catch(err){
      console.log(err);
      return [];
    }
  }, [clinicInfo.id]);

  useEffect(() => {
    if(selectedServiceId) {
      setShowDialog(true);
    }else {
      setShowDialog(false);
    }
  }, [selectedServiceId])

  useEffect(() => {
    if(!selectedDate) return;
    callbackDateTime(selectedDate).then((blockedTimes) => {
      setBlockedTimes(blockedTimes);

      const timesAvailability: AvailableTime[] = clinicInfo.times.map((time) => ({
        time,
        isAvailable: !blockedTimes.includes(time)
      }));

      setAvailableTimes(timesAvailability);
    });
  }, [
      callbackDateTime,
      selectedTime,
      clinicInfo.times,
      selectedDate,
    ]);


  return (
    <main className="mx-5">
      <div className="max-w-6xl mx-auto mt-10 bg-[#fff] shadow-md rounded-t-md overflow-hidden">
        <div className="mx-5 md:mx-10">
          <section>
            <h2 className="text-3xl font-bold text-blue-700 text-center pt-7">Agendamento de consulta</h2>
            <div className="border-b-1 bg-blue-700 h-0.5 mt-7"></div>
          </section>

          <section 
            className="
              full
              border-1 
              border-dashed 
              border-gray-400 
              mt-5 flex 
              items-center 
              justify-center
            "
          >
            <div className="flex flex-col items-center justify-center py-5">
              <Image
                src={Avatar}
                alt="avatar"
                width={120}
                height={120}
                className="rounded-full object-cover overflow-hidden"
              />
              <h2 className="pt-1">{clinicInfo?.name}</h2>
              <div className="pt-2 flex items-center gap-1">
                <FiMapPin />
                <span>{clinicInfo.address ? clinicInfo.address : "O administrador da conta não colocou o endereço"}</span>
              </div>
            </div>
          </section>
          <section>
            <Form {...schemaForm}>
              <form 
                onSubmit={schemaForm.handleSubmit(handleSubmitAppointment)}
                className="space-y-4 mt-7"
              >
                <FormField
                  control={schemaForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pb-1">Nome completo: *</FormLabel>
                      <FormControl>
                        <input
                          id="name"
                          placeholder="Digite seu nome"
                          {...field}
                          className="py-3 px-2 border-1 border-gray-300 outline-0 rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={schemaForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pb-1">Email: *</FormLabel>
                      <FormControl>
                        <input
                          id="email"
                          placeholder="teste@exemple.com"
                          {...field}
                          className="py-3 px-2 border-1 border-gray-300 outline-0 rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={schemaForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pb-1">Telefone: *</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          id="phoneNumber"
                          placeholder="(99) 99999-9999"
                          onChange={(e) => {
                            const format = formatPhoneNumber(e.target.value)
                            field.onChange(format)
                          }}
                          className="py-3 px-2 border-1 border-gray-300 outline-0 rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col md:flex-row items-center w-full gap-2">
                  <FormField
                    control={schemaForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="w-full relative">
                        <FormLabel className="pb-1">Selecione a data de agendamento: *</FormLabel>
                        <FormControl className="">
                          <DateTime
                            initialDateTime={new Date}
                            className="w-full border-1 border-gray-300 py-2 px-2 outline-0"
                            minDate={new Date}
                            onChangeDate={(d) => {
                              if(d) {
                                field.onChange(d)
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={schemaForm.control}
                    name="serviceId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="pb-1">Selecione o serviço *</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full rounded-none outline-0 py-5 cursor-pointer">
                              <SelectValue placeholder="Serviço" />
                            </SelectTrigger>
                            <SelectContent>
                              {clinicInfo.service.map((s) => (
                                <SelectItem key={s.id} value={s.id} className="cursor-pointer">
                                  <div className="flex items-center gap-3 w-full">
                                    <div>
                                      {s.name.toLocaleUpperCase()}
                                    </div>
                                    <div>
                                      <span className="text-cyan-400 pr-1">{Math.floor(s.duration / 60)}h</span> 
                                      <span className="text-red-400">{s.duration % 60}m</span>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                      </DialogHeader>
                      {selectedServiceId && (
                        <div>
                          {availableTimes.length > 0 ? (
                            <AppointmentTimes 
                              handleSelectTime={(t) => setSelectedTime(t)}
                              availableTimes={availableTimes}
                              blockedTimes={blockedTimes}
                              selectedDate={selectedDate}
                              selectedTime={selectedTime}
                              getDuration={
                                clinicInfo.service.find(services => services.id === selectedServiceId) ?
                                Math.ceil(clinicInfo.service.find(services => services.id === selectedServiceId)!.duration / 30) : 0
                              }
                              clinicTimes={clinicInfo.times}
                            />
                          ) : (
                            <p>Nenhum Horario disponivel</p>
                          )}    
                        </div>
                      )}
                      
                    </DialogContent>
                  </Dialog>
 
                </div>

                {clinicInfo.status ? (
                  <button
                    className="bg-cyan-600 w-full text-[#fff] font-bold disabled:bg-blue-200 disabled:cursor-not-allowed py-3 rounded-sm cursor-pointer"
                    type="submit"
                    disabled={
                      !schemaForm.watch("name") || 
                      !schemaForm.watch("email") || 
                      !schemaForm.watch("phoneNumber") ||
                      !schemaForm.watch("date") || 
                      !schemaForm.watch("serviceId")
                    }
                  >
                    Fazer agendamento
                  </button>
                ): (
                  <button 
                    className="
                      bg-cyan-600 
                      w-full 
                      text-[#fff] 
                      font-bold 
                      disabled:bg-blue-200 
                      disabled:cursor-not-allowed 
                      py-3 rounded-sm 
                      cursor-pointer
                    "
                    disabled
                  >
                    Infelizmente por algum motivo a clinica está fechada!
                  </button>
                )
              }

              </form>
            </Form>
          </section>
        </div>
          <section className="location-section mt-5 max-w-7xl mx-auto" id="contato">
            <h2 className="text-center text-xl font-semibold mb-4">
              Visite Nossa clinica
            </h2>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15354.75704153913!2d-47.925577600000005!3d-15.7954546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3978a3d1b827%3A0x6d3e85d9c22d71d3!2sBras%C3%ADlia%2C%20DF!5e0!3m2!1spt-BR!2sbr!4v1633095646199!5m2!1spt-BR!2sbr"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowFullScreen={true}
                loading="lazy"
              />
            </div>
          </section>
      </div>
    </main>
  )
}