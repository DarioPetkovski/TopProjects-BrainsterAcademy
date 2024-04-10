import Banner from "@/components/Banner";
import "../styles/style.css";
import "../styles/bootstrap.min.css";

import Services from "@/components/Services";
import Team from "@/components/Team";

const fetchBannerData = async () => {
  const bannerData = await fetch("http://localhost:5001/homepage").then((res) =>
    res.json()
  );
  const { title, content } = bannerData.banner_content;
  return {
    title,
    content,
  };
};
const fetchServiceData = async () => {
  const serviceData = await fetch("http://localhost:5001/services").then(
    (res) => res.json()
  );
  return {
    serviceData,
  };
};
const fetchServiceBlockData = async () => {
  const serviceBlockData = await fetch(
    "http://localhost:5001/services_page"
  ).then((res) => res.json());
  const { title, preTitle } = serviceBlockData.services_block;
  return {
    title,
    preTitle,
  };
};
const fetchTeamBlockData = async () => {
  const teamBlockData = await fetch("http://localhost:5001/about_page").then(
    (res) => res.json()
  );
  const { title, preTitle } = teamBlockData.team_block;
  return {
    title,
    preTitle,
  };
};

const fetchTeamData = async () => {
  const teamData = await fetch("http://localhost:5001/team").then((res) =>
    res.json()
  );
  return {
    teamData,
  };
};

export default async function Home() {
  const bannerContent = await fetchBannerData();
  const servicesContent = await fetchServiceData();
  const serviceBlockDataContent = await fetchServiceBlockData();
  const teamBlockContnet = await fetchTeamBlockData();
  const teamData = await fetchTeamData();
  return (
    <>
      <Banner {...bannerContent} />
      <Services
        serviceContent={servicesContent.serviceData}
        serviceBlockContent={serviceBlockDataContent}
      />
      <Team teamBlock={teamBlockContnet} teamContent={teamData.teamData} />
    </>
  );
}
