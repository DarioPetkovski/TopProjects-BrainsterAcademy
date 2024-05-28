"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import { Movie, User } from "@/src/Interfaces/Interfaces";
import VideoPlayer from "@/src/components/VideoPlayer";
import axios from "axios";

export default function WatchPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, data, setLastWatched } = useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const pathName = usePathname();
  const watchMovie = data.movies.find((movie) => movie.id === params.id);
  const loggedUser = data.users?.find(
    (item: User) => item.email === user.email && item.password === user.password
  );

  useEffect(() => {
    if (watchMovie) {
      setLastWatched((prev: string[]) => {
        if (!prev) {
          return [watchMovie?.id];
        } else if (
          prev.some((prevMovie: string) => prevMovie === watchMovie.id)
        ) {
          return prev;
        } else {
          const updateUser = {
            ...loggedUser,
            lastWatched: [...prev, watchMovie?.id],
          };
          axios
            .put(`http://localhost:5001/users/${loggedUser?.id}`, updateUser)
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
          return [...prev, watchMovie?.id];
        }
      });
    }
  }, [watchMovie, setLastWatched, loggedUser]);

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
    return <VideoPlayer id={params.id} />;
  }

  return null;
}
