import { redirect } from "next/navigation"; 
import { loadClinicInfo } from "./load_clinic_info/load_clinic_info";
import { AppointmentContent } from "./components/appointment_content";

export default async function AppointmentPage({
  params
}: {
  params: Promise<{ id: string }>
}){

  const { id } = await params;

  const clinicInfo = await loadClinicInfo(id);
  
  // if(!clinicInfo) redirect("/");

  if(!clinicInfo) return;

  return (
    <AppointmentContent clinicInfo={clinicInfo}/>
  )

}