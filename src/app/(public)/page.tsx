import Image from "next/image";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professionals } from "./_components/professionals";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <>  
      <Header />
      <Hero />
      <Professionals />
      <Footer />
    </>
  );  
}






