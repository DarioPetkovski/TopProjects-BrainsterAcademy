"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Services from "@/components/Services";
import { usePathname } from "next/navigation";

export default function page() {
  const firstPart = usePathname().split("/")[1][0].toUpperCase();
  const secondPart = usePathname().split("/")[1].slice(1, 8);
  const pathname = firstPart + secondPart;
  return (
    <div>
      <Breadcrumbs params={pathname} />
      <Services />
    </div>
  );
}
