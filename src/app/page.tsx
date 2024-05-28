"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Prices from "../components/Prices";
import RoomSection from "../components/RoomSection";
import SwiperArtists from "../components/SwiperArtists";
import Banner from "../components/banner";
import PopUpIcons from "../components/popUpIcons";
import { useGlobalContext } from "../context/Context";
import { User } from "../Interfaces/Interfaces";

export default function Home() {
  const router = useRouter();
  const { user } = useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  useEffect(() => {
    if (userInfo) {
      setUserInfo(user);
    }
  }, [userInfo]);
  useEffect(() => {
    if (user.isLogged) {
      router.push("/homepage");
    }
  }, [user.isLogged, router]);

  if (!userInfo.isLogged) {
    return (
      <div>
        <Banner />
        <PopUpIcons />
        <RoomSection />
        <SwiperArtists />
        <div className="container-fluid BG px-5">
          <img
            className="w-100"
            src="/assets/images/familijaMarkovskiBG.jpg"
            alt=""
          />
        </div>
        <Prices />
        <Footer />
      </div>
    );
  }
  return null;
}
