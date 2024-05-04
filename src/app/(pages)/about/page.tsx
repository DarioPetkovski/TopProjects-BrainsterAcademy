"use client";
import AboutBlock from "@/components/AboutBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import TeamBlock from "@/components/TeamBlock";
import { usePathname } from "next/navigation";

export default function page() {
  const firstPart = usePathname().split("/")[1][0].toUpperCase();
  const secondPart = usePathname().split("/")[1].slice(1, 5);
  const pathname = firstPart + secondPart + " " + "us";
  return (
    <div>
      <Breadcrumbs params={pathname} />
      <AboutBlock />
      <TeamBlock />
    </div>
  );
}
