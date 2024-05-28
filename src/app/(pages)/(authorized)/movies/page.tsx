"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";
import HomePageBanner from "@/src/components/HomePageBanner";
import PopularMovies from "@/src/components/PopularMovies";
import GenerMovies from "@/src/components/GenerMovies";
import AuthorizedFooter from "@/src/components/AuthorizedFooter";
import FIlterByGener from "@/src/components/FIlterByGener";
import TypeFilter from "@/src/components/TypeFilter";
import TypeMovieSwiper from "@/src/components/TypeMovieSwiper";
import MovieOverview from "@/src/components/MovieOverview";

export default function Movies() {
  const router = useRouter();
  const { user, data, geners, modal, movieID } = useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const pathName = usePathname();
  const [pagination, setPagination] = useState<boolean>(false);

  const movie = data.movies.find((movie) => movie.id === movieID);

  const onClickPagination = () => {
    setPagination((prev: boolean) => !prev);
  };

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
        {!geners.action &&
          !geners.comedy &&
          !geners.horror &&
          !geners.drama &&
          !geners.history &&
          !geners.sciFi &&
          !geners.thriller &&
          !geners.documentaries && (
            <>
              <PopularMovies />
              <GenerMovies gener="Action" />
              <GenerMovies gener="Comedy" />
              <GenerMovies gener="Horror" />
              <GenerMovies gener="Drama" />
              <GenerMovies gener="History" />
              {pagination && (
                <>
                  <GenerMovies gener="Sci-Fi" />
                  <GenerMovies gener="Thriller" />
                  <TypeMovieSwiper gener="Documentaries" />
                </>
              )}
              <div className="pt-5 w-100 text-center showMore">
                <button
                  onClick={onClickPagination}
                  className="btn btn-info w-25"
                >
                  {pagination ? "Hide" : "Show More"}
                </button>
              </div>
            </>
          )}
        {geners.action && <FIlterByGener gener="Action" />}
        {geners.comedy && <FIlterByGener gener="Comedy" />}
        {geners.horror && <FIlterByGener gener="Horror" />}
        {geners.drama && <FIlterByGener gener="Drama" />}
        {geners.history && <FIlterByGener gener="History" />}
        {geners.sciFi && <FIlterByGener gener="Sci-Fi" />}
        {geners.thriller && <FIlterByGener gener="Thriller" />}
        {geners.documentaries && <TypeFilter type="Documentaries" />}
        <AuthorizedFooter />
      </div>
    );
  }

  return null;
}
