"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";
import Navbar from "@/src/components/Navbar";
import AuthorizedFooter from "@/src/components/AuthorizedFooter";
import SearchMovies from "@/src/components/SearchMovies";
import SearchBar from "@/src/components/SearchBar";
import SimilarMovies from "@/src/components/SimilarMovies";
import MovieOverview from "@/src/components/MovieOverview";

export default function SearchPage() {
  const router = useRouter();
  const { user, data, modal, movieID } = useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const pathName = usePathname();
  const [search, setSearch] = useState<string>("");
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    updateQueryParam(newSearch);
  };

  const updateQueryParam = (newSearch: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("title", newSearch);
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const currentSearch = url.searchParams.get("title") || "";
    setSearch(currentSearch);
  }, []);

  if (userInfo.isLogged) {
    return (
      <div className="search_page">
        {modal && <MovieOverview movie={movie} />}
        <Navbar />
        <SearchBar search={search} handleSearchChange={handleSearchChange} />
        <SearchMovies search={search} />
        <SimilarMovies search={search} />
        <AuthorizedFooter />
      </div>
    );
  }

  return null;
}
