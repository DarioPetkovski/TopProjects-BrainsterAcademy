import AboutBlock from "@/components/AboutBlock";
import Banner from "@/components/Banner";
import MenuBlock from "@/components/MenuBlock";
import Services from "@/components/Services";
import TeamBlock from "@/components/TeamBlock";

export default async function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <AboutBlock />
      <MenuBlock />
      <TeamBlock />
    </div>
  );
}
