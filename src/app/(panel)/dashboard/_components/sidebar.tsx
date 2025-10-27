"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SheetTrigger, Sheet, SheetContent, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaList, FaRegHandshake } from "react-icons/fa";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiFolder, FiSettings } from "react-icons/fi";

import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { SidebarNavigationItem } from "./sidebarNavigationItem";

interface SideBarDashboardProps {
  children: React.ReactNode;
}

export function SideBarDashboard({ children }: SideBarDashboardProps){

  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const closeSheet = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full min-h-screen flex">  

      <aside
        className={clsx("flex flex-col border-dashed border-r-2 border-gray-600 h-full trasition-all", {
          "w-64": !isOpen,
          "w-20": isOpen,
          "hidden md:flex md:fixed": true
        })}
      >
        {
          !isOpen && (
            <h2 className="text-2xl font-bold pl-3 pt-2 mb-5">
              Smart
              <span className="text-cyan-700">
                Consult
              </span>
            </h2>
          )
        }
        <Button 
          className="bg-gray-200 hover:bg-gray-400 self-end cursor-pointer mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {
            isOpen 
              ? 
            (
              <FiChevronRight size={24} color="#505050"/>
            ) 
              :
            (
              <FiChevronLeft size={24} color="#505050"/>
            )
          }
        </Button>

        {isOpen && (
          <nav className="mt-4">
            <SidebarNavigationItem
              href="/dashboard"
              icon={<FiCalendar size={24} color="'#909090"/>}
              closeSheet={closeSheet}
              isOpen={isOpen}
              pathName={pathName}
              label="Agendamento"
            />
            
            <SidebarNavigationItem
              href="/dashboard/services"
              icon={<FiFolder size={24} color="'#909090"/>}
              isOpen={isOpen}
              closeSheet={closeSheet}
              pathName={pathName}
              label="Serviços"
            />
            <SidebarNavigationItem
              href="/dashboard/profile"
              icon={<FiSettings size={24} color="'#909090"/>}
              isOpen={isOpen}
              closeSheet={closeSheet}
              pathName={pathName}
              label="Perfil"
            />
            <SidebarNavigationItem
              href="/dashboard/plans"
              icon={<FaRegHandshake size={24} color="'#909090"/>}
              closeSheet={closeSheet}
              isOpen={isOpen}
              pathName={pathName}
              label="Planos"
            />
          </nav>
        )}

        <Collapsible open={!isOpen}>
          <CollapsibleContent className="pl-3">
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-gray-800 text-sm pt-3 pb-2">
                Painel
              </span>
            </nav>

            <div className="px-2">
              <SidebarNavigationItem
                href="/dashboard"
                icon={<FiCalendar size={24} color="'#909090"/>}
                closeSheet={closeSheet}
                isOpen={isOpen}
                pathName={pathName}
                label="Agendamento"
              />
              
              <SidebarNavigationItem
                href="/dashboard/services"
                icon={<FiFolder size={24} color="'#909090"/>}
                isOpen={isOpen}
                closeSheet={closeSheet}
                pathName={pathName}
                label="Serviços"
              />
              <p className="text-sm pb-2 text-gray-700">Minha conta</p>
              <SidebarNavigationItem
                href="/dashboard/profile"
                icon={<FiSettings size={24} color="'#909090"/>}
                isOpen={isOpen}
                closeSheet={closeSheet}
                pathName={pathName}
                label="Perfil"
              />
              <SidebarNavigationItem
                href="/dashboard/plans"
                icon={<FaRegHandshake size={24} color="'#909090"/>}
                closeSheet={closeSheet}
                isOpen={isOpen}
                pathName={pathName}
                label="Planos"
              />
            </div>

          </CollapsibleContent>
        
        </Collapsible>

      </aside>



      <div className={clsx("flex flex-1 flex-col transition-all duration-300", {
        "md:ml-20": isOpen,
        "md:ml-64": !isOpen
      })}
      >

        <header className="md:hidden flex items-center justify-between border-b-2 border-dashed border-[#909090] h-14 z-10 sticky top-0 bg-whites bg-white">

          <Sheet open={showModal} onOpenChange={setShowModal}>
            <div className="flex items-center gap-5s">
              <SheetTrigger>
                <div
                  onClick={() => setIsOpen(false)}
                  className="md-hidden cursor-pointer border-none pl-2 pr-4"
                >
                  <FaList size={22} color="#909090"/>
                </div>
              </SheetTrigger>
              <h1 className="pl-2 border-none">
                Menu SmartConsult
              </h1>
            </div>

            <SheetContent className="sm:max-w-xs text-black px-3">
              <SheetTrigger className="text-left font-bold text-gray-800 mt-4">SmartConsult</SheetTrigger>
              <SheetDescription>
                Menu do sheet
              </SheetDescription>
              <nav>
                <p className="text-sm pb-2 text-gray-700">Dashboard</p>
                <SidebarNavigationItem
                  href="/dashboard"
                  icon={<FiCalendar size={24} color="'#909090"/>}
                  closeSheet={closeSheet}
                  isOpen={isOpen}
                  pathName={pathName}
                  label="Agendamento"
                />
                
                <SidebarNavigationItem
                  href="/dashboard/services"
                  icon={<FiFolder size={24} color="'#909090"/>}
                  isOpen={isOpen}
                  closeSheet={closeSheet}
                  pathName={pathName}
                  label="Serviços"
                /> 

                <p className="text-sm pb-2 text-gray-700">Minha conta</p>

                <SidebarNavigationItem
                  href="/dashboard/profile"
                  icon={<FiSettings size={24} color="'#909090"/>}
                  isOpen={isOpen}
                  closeSheet={closeSheet}
                  pathName={pathName}
                  label="Perfil"
                />

                <SidebarNavigationItem
                  href="/dashboard/plans"
                  icon={<FaRegHandshake size={24} color="'#909090"/>}
                  closeSheet={closeSheet}                  
                  isOpen={isOpen}
                  pathName={pathName}
                  label="Planos"
                /> 
              </nav>
            </SheetContent>

          </Sheet>

        </header>

        <main className="flex-1 py-5 px-3 md:p-6">
          {children}
        </main>

      </div>
    </div>   
  )
}