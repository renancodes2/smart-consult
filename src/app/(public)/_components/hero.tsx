import Image from "next/image";
import DoctorImage from "@/assets/doctorImage.png";
import { Button } from "@/components/ui/button";


export function Hero(){
  return (
    <section className="flex flex-col-reverse items-center justify-center lg:flex-row lg:justify-between max-w-7xl mx-auto px-5"> 
      <div>
        <h2 className="font-bold text-4xl mb-7 pt-5 pb-2 text-center lg:text-left">Clínica Saúde e Bem-Estar</h2>
        <p className="max-w-2xl pb-4 text-gray-700">
          Na Clínica Saúde e Bem-Estar, oferecemos cuidados médicos especializados para você e sua família. Com uma equipe de profissionais altamente qualificados, garantimos atendimento personalizado, qualidade e um ambiente acolhedor. Nossa missão é promover sua saúde física e mental com tratamentos de última geração, visando o seu bem-estar integral.
        </p>
        <Button className="bg-blue-600">
          Encontre uma clinica
        </Button>
      </div>
      <div className="w-full max-w-96">
        <Image
          src={DoctorImage}
          alt="Doto"
        />

      </div>
    </section>
  )
}