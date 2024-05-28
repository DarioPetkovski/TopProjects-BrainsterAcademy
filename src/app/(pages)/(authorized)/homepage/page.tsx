"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";
import HomePageBanner from "@/src/components/HomePageBanner";
import PopularMovies from "@/src/components/PopularMovies";
import NewRealise from "@/src/components/NewRealise";
import OurRecommandation from "@/src/components/OurRecommandation";
import Podcasts from "@/src/components/Podcasts";
import Kids from "@/src/components/Kids";
import AuthorizedFooter from "@/src/components/AuthorizedFooter";
import MovieOverview from "@/src/components/MovieOverview";

export default function HomePage() {
  const router = useRouter();
  const { user, data, modal, movieID } = useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const pathName = usePathname();
  const movie = data.movies.find((movie) => movie.id === movieID);

  useEffect(() => {
    if (data.users.length !== 0) {
      setUserInfo(user);
    }
  }, [data.users]);

  useEffect(() => {
    if (!user.isLogged && pathName !== "/login") {
      router.push("/login");
    }
  }, [user.isLogged, pathName, router]);

  if (userInfo.isLogged) {
    return (
      <div className="position-relative">
        {modal && <MovieOverview movie={movie} />}
        <HomePageBanner />
        <PopularMovies />
        <NewRealise />
        <div className="popular_movies_con ml-10 pb-2">
          <h1 className="pb-3 BG-header">Coming Soon</h1>
          <img
            className="w-100"
            src="/assets/images/peakyBlinders.png"
            alt=""
          />
        </div>
        <OurRecommandation />
        <div className="popular_movies_con ml-10 py-4">
          <img
            className="w-100 juzniVetar"
            src="/assets/images/juzniVetar.jpg"
            alt=""
          />
        </div>
        <Podcasts />
        <Kids />
        <AuthorizedFooter />
      </div>
    );
  }

  return null;
}
