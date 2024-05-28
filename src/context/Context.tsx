import { useContext, createContext, Dispatch, SetStateAction } from "react";
import {
  Artist,
  CommentInterface,
  Geners,
  Movie,
  PostInterface,
  User,
} from "../Interfaces/Interfaces";

interface ContextInterface {
  setPosts: Dispatch<SetStateAction<PostInterface[]>>;
  setComments: Dispatch<SetStateAction<CommentInterface[]>>;
  lastWatched: string[];
  setLastWatched: Dispatch<SetStateAction<string[]>>;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  movieID: string;
  setMovieID: Dispatch<SetStateAction<string>>;
  geners: Geners;
  setGeners: Dispatch<SetStateAction<Geners>>;
  onClickFilterGener: (gener: string) => void;
  user: User;
  setUsers: Dispatch<SetStateAction<User[]>>;
  setUser: Dispatch<SetStateAction<User>>;
  data: {
    movies: Movie[];
    artists: Artist[];
    users: User[];
    posts: PostInterface[];
    comments: CommentInterface[];
  };
}

export const GlobalContext = createContext({} as ContextInterface);

export const useGlobalContext = () => useContext(GlobalContext);
