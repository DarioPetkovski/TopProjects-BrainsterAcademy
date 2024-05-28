"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";
import AuthorizedFooter from "@/src/components/AuthorizedFooter";
import TypeFilter from "@/src/components/TypeFilter";
import KidsBanner from "@/src/components/KidsBanner";
import MovieOverview from "@/src/components/MovieOverview";

export default function Kids() {
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
        <KidsBanner />
        <TypeFilter type="Kids" />
        <AuthorizedFooter />
      </div>
    );
  }

  return null;
}
