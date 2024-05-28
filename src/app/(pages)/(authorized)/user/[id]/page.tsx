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
import UserOptions from "@/src/components/UserOptions";
import axios from "axios";

export default function UserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, data, movieID, modal, setUsers } = useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const pathName = usePathname();
  const movie = data.movies.find((movie) => movie.id === movieID);
  const findUser = data.users?.find((item: User) => item.id === params.id);
  const [updateComments, setUpdateComments] = useState<CommentInterface[]>([]);
  const [updateDiscussions, setUpdateDiscussions] = useState<PostInterface[]>(
    []
  );

  useEffect(() => {
    axios
      .get("http://localhost:5001/posts")
      .then((res) => setUpdateDiscussions(res.data));
    axios
      .get("http://localhost:5001/comments")
      .then((res) => setUpdateComments(res.data));
    axios.get("http://localhost:5001/users").then((res) => setUsers(res.data));
  }, []);

  const lastWatchedMovies = data?.movies?.filter((movie) => {
    return findUser?.lastWatched?.some((id: string) => id === movie?.id);
  });

  const commentLoggedUser = updateComments?.filter((comment) => {
    return comment?.userID === findUser?.id;
  });
  const discussionLoggedUser = updateDiscussions?.filter((post) => {
    return post?.userID === findUser?.id;
  });
  const totalContributions =
    commentLoggedUser.length + discussionLoggedUser.length;
  const commentPercentage = parseFloat(
    ((commentLoggedUser.length / totalContributions) * 100).toFixed(2)
  );
  const discussionPercentage = parseFloat(
    ((discussionLoggedUser.length / totalContributions) * 100).toFixed(2)
  );

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
          <UserOptions id={params.id} />
        </div>
        <div className="acc_Con">
          <div className="row h-100">
            <div className="col-4 position-absolute user-details_con">
              <div className="user-details">
                <div className="userImg_con">
                  <img
                    style={{ borderRadius: "50%" }}
                    src={findUser?.img}
                    alt=""
                  />
                  {findUser?.type === "artist" && (
                    <div className="verified">
                      <img src="/assets/images/checkMark.png" alt="" />
                    </div>
                  )}
                </div>
                <div className="user_content">
                  <h3 className="mb-0 nickName">{findUser?.userName}</h3>
                  <i>Movie Enjoyer</i>
                  <p className="mt-2">{findUser?.bio}</p>
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
                </div>
              </div>
            </div>
            <div className="col-7 position-absolute text-white user-movies_con">
              <div className="user-movies w-75">
                <h5 className="nickName">Comments by {findUser?.userName}</h5>
                <UserCommentBox loggedUser={findUser} />
                <h5 className="mt-3 mb-0">
                  What <span className="nickName">{findUser?.userName}'s</span>{" "}
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
