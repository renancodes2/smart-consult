import clsx from "clsx";
import Link from "next/link";

interface SidebarNavigationItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathName: string;
  isOpen: boolean;
  closeSheet: () => void;
}

export function SidebarNavigationItem({ 
  href, 
  icon,
  isOpen, 
  label, 
  pathName, 
  closeSheet 
  }: SidebarNavigationItemProps ){

  const handleClick = () => {
    closeSheet();
  }
  
  return (
    <Link
      href={href}
    >
      <div
        onClick={handleClick}
        className={clsx("flex items-center gap-1 mb-2 p-1.5 pl-3", {
          "text-bold border-dashed border-1 border-slate-500": pathName === href,
          "text-gray-800": pathName !== href,
        })}
      >
        <span>{icon}</span>
        <span>{!isOpen && label}</span>
      </div>
    </Link>
  )
}
