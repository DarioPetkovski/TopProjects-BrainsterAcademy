"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import {
  CommentInterface,
  PostInterface,
  User,
} from "@/src/Interfaces/Interfaces";
import Navbar from "@/src/components/Navbar";
import "react-circular-progressbar/dist/styles.css";
import UserBadges from "@/src/components/UserBadges";
import ProgressBar from "@/src/components/ProgressBar";
import MovieOverview from "@/src/components/MovieOverview";
import UserCommentBox from "@/src/components/UserCommentBox";
import UserLastWatched from "@/src/components/UserLastWatched";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "@/src/app/lib/firebaseConfig";

export default function AccountPage() {
  const router = useRouter();
  const { user, data, setUser, movieID, modal, lastWatched, setUsers } =
    useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const pathName = usePathname();
  const movie = data.movies.find((movie) => movie.id === movieID);
  const [updateComments, setUpdateComments] = useState<CommentInterface[]>([]);
  const [updateDiscussions, setUpdateDiscussions] = useState<PostInterface[]>(
    []
  );
  const loggedUser = data?.users.find(
    (item: User) => item.email === user.email
  );
  const lastWatchedMovies = data?.movies?.filter((movie) => {
    return lastWatched?.some((id) => id === movie?.id);
  });

  useEffect(() => {
    axios
      .get("http://localhost:5001/posts")
      .then((res) => setUpdateDiscussions(res.data));
    axios
      .get("http://localhost:5001/comments")
      .then((res) => setUpdateComments(res.data));
    axios.get("http://localhost:5001/users").then((res) => setUsers(res.data));
  }, []);

  const commentLoggedUser = updateComments?.filter((comment) => {
    return comment?.userID === loggedUser?.id;
  });
  const discussionLoggedUser = updateDiscussions?.filter((post) => {
    return post?.userID === loggedUser?.id;
  });
  const totalContributions =
    commentLoggedUser.length + discussionLoggedUser.length;
  const commentPercentage = parseFloat(
    ((commentLoggedUser.length / totalContributions) * 100).toFixed(2)
  );
  const discussionPercentage = parseFloat(
    ((discussionLoggedUser.length / totalContributions) * 100).toFixed(2)
  );

  function generateRandomHash(length: number) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let hash = "";
    for (let i = 0; i < length; i++) {
      hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
  }
  const onClickLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
    setUser((prev: User) => ({
      ...prev,
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
    }));
    const updateIsLogged = {
      ...loggedUser,
      isLogged: false,
    };
    axios.put(`http://localhost:5001/users/${loggedUser?.id}`, updateIsLogged);
  };
  useEffect(() => {
    if (data.users.length !== 0) {
      setUserInfo(user);
    }
  }, [data.users]);

  useEffect(() => {
    if (!user.isLogged && pathName === "/accountPage") {
      router.push("/login");
    }
  }, [user.isLogged, pathName, router]);

  if (userInfo.isLogged) {
    return (
      <div className="account-page">
        {modal && <MovieOverview movie={movie} />}
        <div className="acc_BG">
          <img className="w-100 h-100" src="/assets/images/accBG.jpg" alt="" />
        </div>
        <div className="acc_Con">
          <div className="row h-100">
            <div className="col-4 position-absolute user-details_con">
              <div className="user-details">
                <div className="userImg_con">
                  <img
                    style={{ borderRadius: "50%" }}
                    src={loggedUser?.img}
                    alt=""
                  />
                  {loggedUser?.type === "artist" && (
                    <div className="verified">
                      <img src="/assets/images/checkMark.png" alt="" />
                    </div>
                  )}
                </div>
                <div className="user_content">
                  <h3 className="mb-0 nickName">{loggedUser?.userName}</h3>
                  <i>Movie Enjoyer</i>
                  <p className="mt-2">{loggedUser?.bio}</p>
                  <h4>
                    <b>Badges:</b>
                  </h4>
                  <UserBadges />
                  <ProgressBar
                    discussionLength={discussionPercentage}
                    discussions={discussionLoggedUser?.length}
                    comments={commentLoggedUser?.length}
                    commentsLength={commentPercentage}
                  />
                  <button
                    className="logout position-absolute signin-btn"
                    onClick={onClickLogOut}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
            <div className="col-7 position-absolute text-white user-movies_con">
              <div className="user-movies w-75">
                <h5 className="nickName">Comments by {loggedUser?.userName}</h5>
                {loggedUser && <UserCommentBox loggedUser={loggedUser} />}
                <h5 className="mt-3 mb-0">
                  What{" "}
                  <span className="nickName">{loggedUser?.userName}'s</span>{" "}
                  Watched
                </h5>
                <UserLastWatched movies={lastWatchedMovies} />
              </div>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    );
  }

  return null;
}
