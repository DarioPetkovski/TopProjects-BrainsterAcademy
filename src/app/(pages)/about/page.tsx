import AboutBlock from "@/components/AboutBlock";
import PageBanner from "@/components/PageBanner";

import "../../../styles/style.css";
import "../../../styles/bootstrap.min.css";
import FeatureBlock from "@/components/FeatureBlock";
import Team from "@/components/Team";

const fetchAboutBlockData = async () => {
  const aboutData = await fetch("http://localhost:5001/about_page").then(
    (res) => res.json()
  );
  const { title, preTitle } = aboutData.about_block;
  return {
    title,
    preTitle,
  };
};
const fetchAboutData = async () => {
  const aboutData = await fetch("http://localhost:5001/about_page").then(
    (res) => res.json()
  );
  const {
    title,
    preTitle,
    first_paragraph,
    second_paragraph,
    years,
    slogan,
    image_one,
    image_two,
  } = aboutData.about_block;
  return {
    title,
    preTitle,
    first_paragraph,
    second_paragraph,
    years,
    slogan,
    image_one,
    image_two,
  };
};
const fetchFeatrueData = async () => {
  const aboutData = await fetch("http://localhost:5001/about_page").then(
    (res) => res.json()
  );
  const { title, preTitle, first_paragraph, image_one, image_two, usp_items } =
    aboutData.feature_block;
  return {
    title,
    preTitle,
    first_paragraph,
    image_one,
    image_two,
    usp_items,
  };
};
const fetchTeamBlockData = async () => {
  const teamBlockData = await fetch("http://localhost:5001/services_page").then(
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

export default async function page() {
  const aboutBlockContent = await fetchAboutBlockData();
  const aboutData = await fetchAboutData();
  const featrueData = await fetchFeatrueData();
  const teamBlockContnet = await fetchTeamBlockData();
  const teamData = await fetchTeamData();
  return (
    <>
      <PageBanner {...aboutBlockContent} />
      <AboutBlock {...aboutData} />
      <FeatureBlock {...featrueData} />
      <Team teamBlock={teamBlockContnet} teamContent={teamData.teamData} />
    </>
  );
}
