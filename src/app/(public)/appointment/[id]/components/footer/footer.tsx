import { FaEnvelope } from "react-icons/fa";
import { FiGithub, FiInstagram, FiLinkedin, FiPhone } from "react-icons/fi";


export function Footer(){
  return (
    <footer className="bg-[#2c3e50] py-10 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-[#ffffff] ml-10">
        <div>
          <h2 className="font-bold">Contatos</h2>
          
          <ul className="text-[#ccc] pt-3">
            <li className="flex items-center gap-1 space-y-3">
              <FiPhone size={17} />
              (87) 99209-2113
            </li>
            <li className="flex items-center gap-1 space-y-3">
              <FaEnvelope size={17} />
              renan.tech@outlook.com
            </li>
            <li className="flex items-center pt-3 gap-2">
              <a href="#">
                <FiLinkedin size={20} />
              </a>
              <a href="#">
                <FiGithub size={20} />
              </a>
              <a href="#">
                <FiInstagram size={20} />
              </a>
            </li>
          </ul>

        </div>
        <div>
          <h2 className="font-bold">Links Úteis</h2>

          <div>
            <ul className="list-disc pl-5 space-y-3 text-sm text-[#ccc] pt-3">
              <li>Política de Privacidade</li>
              <li>Termos de Serviço</li>
              <li>Perguntas Frequentes</li>
            </ul>
          </div>

        </div>
        <div>
          <h2 className="font-bold">Receba Ofertas</h2>

          <input type="text" className=" outline-0 bg-white text-black px-2"/>
        </div>
      </div>
    </footer> 
  )
}