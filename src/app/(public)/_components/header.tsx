"use client"
import Link from "next/link"
import { FiLoader, FiLogIn, FiMenu } from "react-icons/fi"
import { handleRegister } from "../_actions/login"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSession } from "next-auth/react";

export function Header(){
  const [isOpen, setIsOpen] = useState(false);
  const { data: session , status } = useSession();
  
  console.log(session, status)

  async function handleLogin(){
    await handleRegister("github")
  }

  const items = [
    { href: "#profissional", label: "Profissional"},
  ]

  const NavLinks = () => {
    return (
      <>
        {items.map((item) => (
          <Button
            key={item.href}
            asChild
            className="bg-transparent hover:bg-transparent shadow-none"

          >
            <Link href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          </Button>
        ))}

        {status === 'loading' 
        ? (
          <div className="animate-spin">
            <FiLoader size={24} color="#909090" />
          </div>
        ): session ? (
          <Link href="/dashboard">
            Painel clinica
          </Link>
        ): (
          <Button
            onClick={handleLogin}
          >  
            <FiLogIn />
            Fazer login
          </Button> 
        )
      }
      </>
    )
  }

  return (
    <header
      className="flex items-center justify-center border-b-1 border-slate-300"
    >
      <div className="flex items-center justify-between container w-full h-13 max-w-7xl">
        <div className="pl-3">
          <Link href="/" 
            className="font-bold text-2xl hover:tracking-widest duration-700"
          >
            Smart<span className="text-cyan-700">Consult</span></Link>
        </div>  

        <nav className="items-center font-medium gap-4 hidden md:flex">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              className="bg-transparent"
              variant="ghost"
              size="icon"
            >
              <FiMenu size={24} color="#121212"/>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[240px] sm:w-[300px] z-[999] px-3 bg-[#121212] text-white"
          >
            <SheetHeader></SheetHeader>
            <SheetTitle className="text-white pt-3">
              Menu
            </SheetTitle>
            <SheetDescription>
              Todos os links
            </SheetDescription>
            <nav>
              <NavLinks />  
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
