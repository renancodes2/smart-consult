import { Card, CardContent } from "@/components/ui/card";
import AvatarImg from "@/assets/avatar.png";
import Image from "next/image";
import Link from "next/link";
import { BiArrowToRight } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";

export function Professionals(){


  
  return (
    <section className="py-10 max-w-7xl mx-auto">
      <div> 
        <h2 className="py-3 text-center text-2xl font-bold">Clinicas disponiveis</h2>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">


        <Card className="p-0">
          <CardContent className="p-0">
            <div>
              <div className="relative h-60">
                <Image
                  src={AvatarImg}
                  alt="Img"
                  fill
                  quality={100}
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-between space-y-4 p-2">
                <div>
                  <h3>Clinica centro</h3>

                  <p>
                     Rua: Galvão bueno, Centenario, centro
                  </p>
                </div>

                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <Link 
                href="/clinic/123"
                className="w-full flex items-center justify-center bg-emerald-300 h-10"
              >
                <span>Agendar Horario</span>

                <FaArrowRight />
              </Link>
            </div>
          </CardContent>
        </Card>

        </section>
      </div>
    </section>
  )
}