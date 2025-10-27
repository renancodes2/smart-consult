import React from "react";
import { SideBarDashboard } from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <>
      <SideBarDashboard>
        {children}
      </SideBarDashboard>

    </>
  )
}