"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { GlobalContext } from "./Context";
import {
  Artist,
  CommentInterface,
  Geners,
  Movie,
  PostInterface,
  User,
} from "../Interfaces/Interfaces";
import axios from "axios";

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [lastWatched, setLastWatched] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [movieID, setMovieID] = useState<string>("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [user, setUser] = useState<User>(() => {
    try {
      const storedUser = localStorage.getItem("userSetter");
      return storedUser ? JSON.parse(storedUser) : getDefaultUser();
    } catch (error) {
      console.log(error);
      return getDefaultUser();
    }
  });
  const loggedUser = users?.find((item: User) => item.email === user.email);
  const [geners, setGeners] = useState<Geners>({
    action: false,
    comedy: false,
    horror: false,
    drama: false,
    history: false,
    sciFi: false,
    thriller: false,
    documentaries: false,
  });
  const onClickFilterGener = (gener: string) => {
    setGeners((prev: any) => {
      const updatedGeners = { ...prev };
      Object.keys(updatedGeners).forEach((key) => {
        updatedGeners[key] = key === gener;
      });

      return updatedGeners;
    });
  };
  function generateRandomHash(length: number) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let hash = "";
    for (let i = 0; i < length; i++) {
      hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
  }

  function getDefaultUser(): User {
    return {
      id: `${generateRandomHash(10)}`,
      email: "",
      password: "",
      confPassword: "",
      img: "/assets/images/userPhoto.png",
      type: "",
      interests: [],
      totorial: "",
      subscribtion: "",
      userName: "",
      bio: "",
      cultures: [],
      fav_categories: [],
      notifications: [
        {
          email_notifications: false,
          app_notifications: false,
          no_notifications: false,
        },
      ],
      privacy: "",
      isLogged: false,
      friends: [],
      followers: [],
      lastWatched: [],
    };
  }

  useEffect(() => {
    localStorage.setItem("userSetter", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userSetter");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  type setMovieType = Dispatch<SetStateAction<Movie[]>>;
  type setArtistType = Dispatch<SetStateAction<Artist[]>>;
  type setUsersType = Dispatch<SetStateAction<User[]>>;
  type setPostsType = Dispatch<SetStateAction<PostInterface[]>>;
  type setCommentsType = Dispatch<SetStateAction<CommentInterface[]>>;
  const fetchData = (
    setter:
      | setMovieType
      | setArtistType
      | setUsersType
      | setCommentsType
      | setPostsType,
    url: string
  ) => {
    axios.get(url).then((res: any) => setter(res.data));
  };

  useEffect(() => {
    fetchData(setMovies, "http://localhost:5001/movies");
    fetchData(setArtists, "http://localhost:5001/artists");
    fetchData(setUsers, "http://localhost:5001/users");
    fetchData(setPosts, "http://localhost:5001/posts");
    fetchData(setComments, "http://localhost:5001/comments");
  }, []);

  useEffect(() => {
    if (loggedUser?.lastWatched) {
      setLastWatched(loggedUser?.lastWatched);
    }
  }, [loggedUser]);

  const GlobalData = {
    setPosts,
    setComments,
    lastWatched,
    setLastWatched,
    modal,
    setModal,
    movieID,
    setMovieID,
    geners,
    setGeners,
    onClickFilterGener,
    user,
    setUsers,
    setUser,
    data: {
      movies,
      artists,
      users,
      posts,
      comments,
    },
  };

  return (
    <GlobalContext.Provider value={GlobalData}>
      {children}
    </GlobalContext.Provider>
  );
};
