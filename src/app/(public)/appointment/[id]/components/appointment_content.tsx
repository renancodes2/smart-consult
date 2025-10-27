import { Main } from "./main/main";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Prisma } from "@/generated/prisma";

export interface UserWithServicesAndSubscription extends Prisma.UserGetPayload<{
  include: {
    subscription: true,
    service: true
  }
}>{};

interface AppointmentContentProps {
  clinicInfo: UserWithServicesAndSubscription;
}

export function AppointmentContent({ clinicInfo }: AppointmentContentProps){

  return (
    <>
      <main className="bg-[#f8f9fa] w-full h-full">
        <Header />
        <Main clinicInfo={clinicInfo}/>
        <Footer />
      </main>
    </>
  )
}