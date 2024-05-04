"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import MenuBlock from "@/components/MenuBlock";
import { usePathname } from "next/navigation";

export default function page() {
  const firstPart = usePathname().split("/")[1][0].toUpperCase();
  const secondPart = usePathname().split("/")[1].slice(1, 4);
  const pathname = firstPart + secondPart;
  return (
    <div>
      <Breadcrumbs params={pathname} />
      <MenuBlock />
    </div>
  );
}
